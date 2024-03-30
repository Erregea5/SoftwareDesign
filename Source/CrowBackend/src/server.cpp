#include "server.h"

json database = {
    {"ClientCurID",1},
    {"FuelQuoteCurID",1},
    {"FuelQuote",{}},
    {"Client",{}}
};

vector<string> states ={
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
};

Auth::Auth(const crow::request& req) {
    cout << req.body << endl;
    data = crow::json::load(req.body);
    if (!data ||
        !data.has("username") || data["username"].t() != crow::json::type::String ||
        !data.has("password") || data["password"].t() != crow::json::type::String) {
        empty = true;
        return;
    }
    cout << data["username"].s() << ", " << data["password"].s() << endl;
    username = data["username"].s();
    password = data["password"].s();
}


void setupServer(crow::App<crow::CORSHandler>& app) {
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
                if(changes.has("Full Name")&& changes["Full Name"].s().size()>50){
                    return crow::response(INPUT_MISMATCH);
                }
                if(changes.has("Address 1")&& changes["Address 1"].s().size()>100){
                    return crow::response(INPUT_MISMATCH);
                }
                if(changes.has("Address 2")&& changes["Address 2"].s().size()>100){
                    return crow::response(INPUT_MISMATCH);
                }
                if(changes.has("City")&& changes["City"].s().size()>100){
                    return crow::response(INPUT_MISMATCH);
                }
                if(changes.has("State")&& std::find(states.begin(),states.end(), changes["State"].s())==states.end()){
                    return crow::response(INPUT_MISMATCH);
                }
                if(changes.has("Zipcode")&&(changes["Zipcode"].i()!=5 && changes["Zipcode"].i()!=9)){
                    return crow::response(INPUT_MISMATCH);
                }
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

    // CROW_ROUTE(app, "/api/predictRateOfFuel")
    //     .methods("POST"_method)(
    //         [](const crow::request& req) {
    //             Auth auth(req);
    //             if (auth.empty)
    //                 return crow::response(MISSING_CREDENTIALS);

    //             auto gallonsRequested = auth.data["gallonsRequested"];
    //             auto companyProfitMargin = auth.data["companyProfitMargin"];
    //             if(!gallonsRequested||gallonsRequested.t()!=crow::json::type::Number||
    //                 !companyProfitMargin||companyProfitMargin.t()!=crow::json::type::Number)
    //                 return crow::response(MISSING_DATA);
                
    //             return crow::response(
    //                 Routes::predictRateOfFuel(
    //                     auth.username, auth.password, 
    //                     gallonsRequested.d(), companyProfitMargin.d()
    //                 ).dump()
    //             );
    //         });

    CROW_ROUTE(app, "/api/predictRateOfFuel")
    .methods("POST"_method)(
        [](const crow::request& req) {
            Auth auth(req);
            if (auth.empty || auth.password.empty())
                return crow::response(400, MISSING_CREDENTIALS);

            auto gallonsRequested = auth.data["gallonsRequested"];
            auto companyProfitMargin = auth.data["companyProfitMargin"];

            if (!gallonsRequested || gallonsRequested.t() != crow::json::type::Number ||
                !companyProfitMargin || companyProfitMargin.t() != crow::json::type::Number) {
                return crow::response(400, MISSING_DATA);
            }

            // Check if gallonsRequested is a valid positive number
            double gallons = gallonsRequested.d();
            if (gallons <= 0) {
                return crow::response(400, MISSING_DATA);
            }

            // Check if companyProfitMargin is a valid positive number
            double profitMargin = companyProfitMargin.d();
            if (profitMargin <= 0) {
                return crow::response(400, MISSING_DATA);
            }

            return crow::response(
                Routes::predictRateOfFuel(
                    auth.username, auth.password,
                    gallons, profitMargin
                ).dump()
            );
        });
}

#ifndef TEST
int main() {
    crow::App<crow::CORSHandler> app;
    setupServer(app);
    app.port(18080).run();
    return 0;
}
#endif