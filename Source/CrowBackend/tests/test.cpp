#define CATCH_CONFIG_MAIN
#include "..\src\server.h"
#include <catch.hpp>

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
    req.body = json({{"password","pass"},{"username","user"},{"changes",{"Full Name","test tester"}}}).dump();

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
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"age","21"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Missing Data");
    }
    
    SECTION("profile update proper changes"){
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["password"] == "pass");
        REQUIRE(database["Client"]["user"]["password"].getString() == "pass");
    }
    
    SECTION("profile update invalid long name"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"Full Name","123456789012345678901234567890123456789012345678901"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid address 1 too long"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"Address 1","123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid address 2 too long"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"Address 2","123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid city too long"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"City","123456789012345678901234567890123456789012345678901123456789012345678901234567890123456789012345678901"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid incorrect state name"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"State","BK"}}}).dump();
        app.handle_full(req,res);
        auto data = crow::json::load(res.body);
        REQUIRE(res.code ==200);
        REQUIRE(data["error"]=="Input Mismatch");
    }

    SECTION("profile update invalid zipcode"){
        req.body = json({{"password","pass"},{"username","user"},{"changes",{"Zipcode","1234567"}}}).dump();
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
        REQUIRE(data["password"] == "pass");
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
