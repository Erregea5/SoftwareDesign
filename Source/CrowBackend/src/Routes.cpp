#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"

namespace Routes { 
    const json login(const string& username, const string& password) {
        return Client(username, password).toJson();
    }
    const bool _register(const string& username, const string& password) {
        return !(Client(username, password, false).loggedIn);
    }
    const json profileManagement(const string& username, const string& password, const readJson& changes) {
        auto client = Client(username, password);
        json clientJson = client.toJson();
        auto keys = changes.keys();
        cout << "keys: ";
        for (auto& key : keys) {
            if(key=="clientLocation"||key=="clientHistory") 
                clientJson[key] = changes[key].i();
            else if(key=="password")
                clientJson[key] = changes[key].s();
        }
        cout <<clientJson.dump() << endl;
        
        client.updateDatabase(clientJson);
        return clientJson;
    }
    const json predictRateOfFuel(const string& username, const string& password, const double gallonsRequested, const double companyProfitMargin) {
        auto client = Client(username, password);
        auto quote = FuelQuote(client, gallonsRequested, companyProfitMargin);
        
        return {
            {"client",client.toJson()},
            {"quote",quote.toJson()}
        };
    }
    const bool fulfillPurchase(const string& username, const string& password) {
        return Client(username, password).buyFuel();
    }
    const json getFuelQuoteHistory(const string& username, const string& password) {
        json output = {};
        auto history=Client(username, password).getFuelQuoteHistory();
        for (auto& quote : history) 
            output[quote.id] = json(quote.toJson());
        
        return output;
    }
};