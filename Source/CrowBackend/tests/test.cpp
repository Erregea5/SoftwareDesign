#include "pch.h"
#include "../src/Database.h"
#define CATCH_CONFIG_MAIN
#include "../src/server.h"
#include <catch.hpp>


using namespace sqlite_orm;
crow::App<crow::CORSHandler> app;

TEST_CASE("start the server") {
    setupServer(app);
    app.validate();
    database.remove_all<Client>(where(c(&Client::username) == "user"));
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
        REQUIRE(database.get_all<Client>(where(c(&Client::username) == "user")).size() == 1);
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
            {"password", "test"}
        }}
    }).dump();

    SECTION("profile update proper changes") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["password"] == "test");
        REQUIRE(database.get_all<Client>(where(c(&Client::username) == "user"))[0].password == "test");
    }

    SECTION("profile update proper changes back") {
        req.body = json({
            {"password", "test"},
            {"username", "user"},
            {"changes", {
                {"password", "pass"}
            }}
            }).dump();
            app.handle_full(req, res);
            auto data = crow::json::load(res.body);
            REQUIRE(res.code == 200);
            REQUIRE(data["password"] == "pass");
            REQUIRE(database.get_all<Client>(where(c(&Client::username) == "user"))[0].password == "pass");
    }

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
        //REQUIRE(data["error"]=="Missing Data");
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

TEST_CASE("Get Fuel Quote History") {
    crow::request req;
    crow::response res;

    req.url = "/api/getFuelQuoteHistory";
    req.method = crow::HTTPMethod::POST;
    req.body = json({{"password","hi"},{"username","hi"}}).dump();

    SECTION("fuel quote retrival successful") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data.t()==crow::json::type::List);
        REQUIRE(database.get_all<FuelQuote>(where(c(&FuelQuote::clientId) == Client("hi","hi").id)).size()>0);
    }

    SECTION("get quotes without password") {
        req.body = json({ {"username","hi"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"]=="Missing Credentials");
    }
    
    SECTION("get quotes without username") {
        req.body = json({ {"password","hi"} }).dump();
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

TEST_CASE("attempt fulfill purchase") {
    crow::request req;
    crow::response res;
    req.url = "/api/fullFillPurchase";
    req.method = crow::HTTPMethod::POST;
    req.body = json({{"password","hi"},{"username","hi"}}).dump();

    SECTION("successful purchase fuelquote") {
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["status"]=="success");
    }

    SECTION("attempt fulfill purchase without password") {
        req.body = json({ {"username","hi"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"] == "Missing Credentials");
    }
    
    SECTION("attempt fulfill purchase without username") {
        req.body = json({ {"password","hi"} }).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"] == "Missing Credentials");
    }

    SECTION("attempt purchase fuelquote invalid method") {
        req.method = crow::HTTPMethod::GET;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);

        req.method = crow::HTTPMethod::PUT;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);

        req.method = crow::HTTPMethod::Delete;
        app.handle_full(req, res);
        REQUIRE(res.code == 405);
    }
}

TEST_CASE("login - /api/login route") {
    crow::request req;
    crow::response res;

    SECTION("Login with valid credentials") {
        req.url = "/api/login";
        req.method = crow::HTTPMethod::POST;
        req.body = json({{"password", "valid_pass"}, {"username", "valid_user"}}).dump();
        app.handle_full(req, res);
        //auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
    }

    SECTION("Login with missing credentials") {
        req.url = "/api/login";
        req.method = crow::HTTPMethod::POST;
        req.body = json({{"password", ""}, {"username", "valid_user"}}).dump();
        app.handle_full(req, res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code == 200);
        REQUIRE(data["error"] == "Missing Credentials");
    }

    // Add more test cases as needed to cover different scenarios
}
