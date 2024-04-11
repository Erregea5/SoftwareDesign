#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"

namespace Routes { 
    const json login(const string& username, const string& password) {
        Client client(username, password);
        if(client.loggedIn)
            return client.toJson();
        return { {"error","incorrect password"} };
    }
    const json _register(const string& username, const string& password) {
        Client client(username, password, false);
        if (client.loggedIn)
            return client.toJson();
        return { {"error","username already exists"} };
    }
    const json profileManagement(const string& username, const string& password, const readJson& changes) {
        auto client = Client(username, password);
        auto keys = changes.keys();
        cout << "keys: ";
        for (auto& key : keys) {//find way to do it without looping
            if(key=="clientHistory") 
                client.clientHistory = ClientHistory(changes[key].i());
            else if(key == "clientLocation")
                client.clientLocation = ClientLocation(changes[key].i());
            else if(key=="password")
                client.password = string(changes[key].s());
        }
        client.updateDatabase();
        return client.toJson();
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