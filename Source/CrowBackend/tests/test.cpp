#define CATCH_CONFIG_MAIN
#include "../src/server.h"
#include <catch2/catch.hpp>

crow::App<crow::CORSHandler> app;

TEST_CASE("start the server") {
    setupServer(app);
    app.validate();
    REQUIRE(true);
}

TEST_CASE("attempt register") {
    crow::request req;
    crow::response res;

    req.url = "/api/register";
    req.method = crow::HTTPMethod::POST;
    req.body = json({{"password","pass"},{"username","user"}}).dump();

    SECTION("register a new customer") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["password"] == "pass");
        REQUIRE(database["Client"]["user"]["password"].getString() == "pass");
    }
    
    SECTION("attempt reregister of customer") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"] == "username already exists");
    }

    SECTION("attempt registration without password") {
        req.body = json({ {"username","user"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("attempt registration without username") {
        req.body = json({ {"password","pass"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("attempt registration with wrong method") {
        req.method = crow::HTTPMethod::GET;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);
    }
}

TEST_CASE("profile management test"){
    crow::request req;
    crow::response res;
    req.url = "/api/profileManagement";
    req.method = crow::HTTPMethod::POST;
req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"Full Name", "test tester"}
    }}
}).dump();
    SECTION("attempt profile update without password") {
        req.body = json({ {"username","user"},{"fullname","test tester"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("attempt profile update without username") {
        req.body = json({ {"password","pass"},{"fullname","test tester"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("attempt profile update with wrong method") {
        req.method = crow::HTTPMethod::GET;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);
    }

    SECTION("profile update changing nonexistent field"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"age", "21"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        // REQUIRE(data["error"]=="Missing Data");
    }
    
    SECTION("profile update proper changes"){
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["password"] == "pass");
        REQUIRE(database["Client"]["user"]["password"].getString() == "pass");
    }
    
    SECTION("profile update invalid long name"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"Full Name", "123456789012345678901234567890123456789012345678901"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid address 1 too long"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"Address 1", "123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid address 2 too long"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"Address 2", "123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid city too long"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"City", "123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid incorrect state name"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"State", "BK"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid zipcode"){
        req.body = json({
    {"password", "pass"},
    {"username", "user"},
    {"changes", {
        {"Zipcode", "1234567"}
    }}
}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }
}

TEST_CASE("Get Fuel Quote History") {
    crow::request req;
    crow::response res;

    req.url = "/api/getFuelQuoteHistory";
    req.method = crow::HTTPMethod::POST;
    req.body = json({{"password","pass"},{"username","user"}}).dump();

    SECTION("fuel quote retrival successful") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        // REQUIRE(data["password"] == "pass");
        REQUIRE(database["Client"]["user"]["password"].getString() == "pass");
    }

    SECTION("get quotes without password") {
        req.body = json({ {"username","user"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("get quotes without username") {
        req.body = json({ {"password","pass"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("get quotes with wrong method") {
        req.method = crow::HTTPMethod::GET;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);
    }
}

TEST_CASE("Predict Rate of Fuel - Incorrect/Missing Inputs") {
    crow::request req;
    crow::response res;

    req.url = "/api/predictRateOfFuel";
    req.method = crow::HTTPMethod::POST;

    SECTION("Missing Username") {
        req.body = json({
            {"password", "hi"},
            {"companyProfitMargin", "0.1"},
            {"gallonsRequested", "100"}
        }).dump();

        app.handle_full(req, res);
        REQUIRE(res.code == 400); // Assuming a proper status code for missing inputs
        // Add assertions for the error response, if applicable
    }

    SECTION("Missing Password") {
        req.body = json({
            {"username", "hi"},
            {"companyProfitMargin", "0.1"},
            {"gallonsRequested", "100"}
        }).dump();

        app.handle_full(req, res);
        REQUIRE(res.code == 400);
        // Add assertions for the error response, if applicable
    }

    // Add more sections for other missing/incorrect inputs, such as companyProfitMargin, gallonsRequested, etc.
    
    SECTION("Invalid Company Profit Margin") {
        req.body = json({
            {"username", "hi"},
            {"password", "hi"},
            {"companyProfitMargin", "invalid_value"}, // Invalid value for companyProfitMargin
            {"gallonsRequested", "100"}
        }).dump();

        app.handle_full(req, res);
        REQUIRE(res.code == 400);
        // Add assertions for the error response, if applicable
    }

    SECTION("Invalid Gallons Requested") {
        req.body = json({
            {"username", "hi"},
            {"password", "hi"},
            {"companyProfitMargin", "0.1"},
            {"gallonsRequested", "invalid_value"} // Invalid value for gallonsRequested
        }).dump();

        app.handle_full(req, res);
        REQUIRE(res.code == 400);
        // Add assertions for the error response, if applicable
    }
}

TEST_CASE("attempt fulfill purchase") {
    // crow::request tempReq;
    // crow::response tempRes;
    // tempReq.url = "/api/predictRateOfFuel";
    // tempReq.method = crow::HTTPMethod::POST;
    // tempReq.body = json({{"password","pass"},{"username","user"}}).dump();
    // app.handle_full(tempReq, tempRes);
    // const auto data = crow::json::load(tempRes.body);

//     // REQUIRE(tempRes.code == 200);
//     // REQUIRE((data.has("client") && data.has("quote")));

    crow::request req;
    crow::response res;
    req.url = "/api/fullFillPurchase";
    req.method = crow::HTTPMethod::POST;
    req.body = json({{"password","pass"},{"username","user"}}).dump();

    SECTION("successful purchase fuelquote") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        // REQUIRE(data["status"] == "success");

        // json client = database["Client"]["user"];
        // int mostRecentFuelQuoteId = stoi(client["mostRecentFuelQuoteId"].dump());
        // REQUIRE(database["FuelQuote"][mostRecentFuelQuoteId]["purchasedDate"].dump() != "null");
    }

    SECTION("attempt fulfill purchase without password") {
        req.body = json({ {"username","user"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("attempt fulfill purchase without username") {
        req.body = json({ {"password","pass"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }

    SECTION("attempt purchase fuelquote invalid method") {
        req.method = crow::HTTPMethod::GET;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);

        req.method = crow::HTTPMethod::PUT;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);

        req.method = crow::HTTPMethod::DELETE;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);
    }
}