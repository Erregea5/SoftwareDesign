#include "pch.h"
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
            if (key == "state") {
                unsigned loc = 1;
                if(changes[key].s()=="TX")
                    loc = 0;
                client.update(&Client::clientLocation, loc);
                client.update(&Client::state, changes[key].s());
            }
            else if (key == "password") 
                client.update(&Client::password, changes[key].s());
            else if (key == "zipcode")
                client.update(&Client::zipcode, changes[key].i());
            else if (key == "city") 
                client.update(&Client::city, changes[key].s());
            else if (key == "fullName") 
                client.update(&Client::fullName, changes[key].s());
            else if (key == "address1") 
                client.update(&Client::address1, changes[key].s());
            else if (key == "address2") 
                client.update(&Client::address2, changes[key].s());
            
        }
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
        int i = 0;
        for (auto& quote : history)  {
            output[i] = json(quote.toJson());
            ++i;
        }
        
        return output;
    }
};