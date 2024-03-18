#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"

#define MISSING_CREDENTIALS 400
#define MISSING_DATA 400
#define SUCCESS "success"
#define FAILURE "failure"

json database = {
    {"ClientCurID",1},
    {"FuelQuoteCurID",1},
    {"FuelQuote",{}},
    {"Client",{}}
};

class Auth {
public:
    std::string username,
        password;
    readJson data;
    bool empty = false;
public:
    Auth(const crow::request& req) {
        cout << req.body << endl;
        data = crow::json::load(req.body);
        if (!data || 
            !data["username"] || data["username"].t() != crow::json::type::String ||
            !data["password"] || data["password"].t() != crow::json::type::String)
            empty = true;
        cout << data["username"].s() << ", " << data["password"].s() << endl;
        username = data["username"].s();
        password = data["password"].s();
    }
};

int main() {
    crow::App<crow::CORSHandler> app;

    CROW_ROUTE(app, "/api/login")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);
                return crow::response(Routes::login(auth.username, auth.password).dump());
            });

    CROW_ROUTE(app, "/api/register")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);
                return crow::response(Routes::_register(auth.username, auth.password).dump());
            });

    CROW_ROUTE(app, "/api/profileManagement")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);

                readJson changes = auth.data["changes"];
                if (!changes||changes.t()!=crow::json::type::Object)
                    return crow::response(MISSING_DATA);
                //ensure correct data
                
                return crow::response(Routes::profileManagement(auth.username, auth.password, changes).dump());
            });

    CROW_ROUTE(app, "/api/fullFillPurchase")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);
                return crow::response(Routes::fulfillPurchase(auth.username, auth.password) ? SUCCESS : FAILURE);
            });

    CROW_ROUTE(app, "/api/getFuelQuoteHistory")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);
                return crow::response(Routes::getFuelQuoteHistory(auth.username, auth.password).dump());
            });

    CROW_ROUTE(app, "/api/predictRateOfFuel")
        .methods("POST"_method)(
            [](const crow::request& req) {
                Auth auth(req);
                if (auth.empty)
                    return crow::response(MISSING_CREDENTIALS);

                auto gallonsRequested = auth.data["gallonsRequested"];
                auto companyProfitMargin = auth.data["companyProfitMargin"];
                if(!gallonsRequested||gallonsRequested.t()!=crow::json::type::Number||
                    !companyProfitMargin||companyProfitMargin.t()!=crow::json::type::Number)
                    return crow::response(MISSING_DATA);
                
                return crow::response(
                    Routes::predictRateOfFuel(
                        auth.username, auth.password, 
                        gallonsRequested.d(), companyProfitMargin.d()
                    ).dump()
                );
            });

    app.port(18080).multithreaded().run();

	return 0;
}