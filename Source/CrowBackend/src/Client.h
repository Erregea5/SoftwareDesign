#ifndef Client___
#define Client___
#include <string>
#include <vector>
//class json;
class FuelQuote;
class Client {
public:
    unsigned id;
    std::string username;
    std::string password;
    unsigned clientLocation;
    unsigned mostRecentFuelQuoteId; // Foreign key "pointing" to a `FuelQuote`'s `id`
    std::string fullName;
    unsigned zipcode;
    std::string city, state, address2, address1;
    bool loggedIn;
public:
    Client() {}
    Client(const std::string& username, const std::string& password, bool loggingIn=true); // Will populate the rest of the fields by querying
    const FuelQuote getMostRecentFuelQuote() const;
    const bool buyFuel(); // Purchase the FuelQuote with `id` = `mostRecentFuelQuoteId` and set `purchasedDate` to `time(NULL)`
    std::vector<FuelQuote> getFuelQuoteHistory() const;
    const void update(std::string Client::*member,const std::string& val);
    const void update(unsigned Client::*member, unsigned val);
    const json toJson();
};
#endif
