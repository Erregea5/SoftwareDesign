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
