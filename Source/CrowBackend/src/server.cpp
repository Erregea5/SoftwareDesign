#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"

json database = {
    {"ClientCurID",1},
    {"FuelQuoteCurID",1},
    {"FuelQuote",{}},
    {"Client",{}}
};

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([] {
        return "Hello world";
    });

    CROW_ROUTE(app, "/api/login/<string>/<string>")(
        [](string username, string password) {
            return Routes::login(username, password);
        });

    CROW_ROUTE(app, "/api/register/<string>/<string>")(
        [](string username, string password) {
            return Routes::_register(username, password)?"success":"failure";
        });

    CROW_ROUTE(app, "/api/profileManagement/<string>/<string>")
        .methods("POST"_method)(
            [](const crow::request& req, string username, string password) {
                cout << req.body << endl;
                auto changes = crow::json::load(req.body);
                if (!changes)     
                    return crow::response(400);
                
                return crow::response(Routes::profileManagement(username, password, changes).dump());
            });

    CROW_ROUTE(app, "/api/fullFillPurchase/<string>/<string>")(
        [](string username, string password) {
            return Routes::fulfillPurchase(username, password)?"success":"failure";
        });

    CROW_ROUTE(app, "/api/getFuelQuoteHistory/<string>/<string>")(
        [](string username, string password) {
            return Routes::getFuelQuoteHistory(username, password);
        });

    CROW_ROUTE(app, "/api/predictRateOfFuel/<string>/<string>")
        .methods("POST"_method)(
            [](const crow::request& req, string username, string password) {
                auto data = crow::json::load(req.body);
                if (!data)
                    return crow::response(400);
                return crow::response(
                    Routes::predictRateOfFuel(
                        username, password, 
                        data["gallonsRequested"].d(), data["companyProfitMargin"].d()
                    ).dump()
                );
            });

    app.port(18080).run();

	return 0;
}