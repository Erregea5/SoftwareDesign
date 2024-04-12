#ifndef Client___
#define Client___
#include <string>
#include <vector>
//class json;
class FuelQuote;
enum change {
    password,clientLocation,clientHistory,mostRecentFuelQuoteId
};
class Client {
public:
    unsigned id;
    std::string username;
    std::string password;
    int clientLocation;
    int clientHistory;
    unsigned mostRecentFuelQuoteId; // Foreign key "pointing" to a `FuelQuote`'s `id`
    bool loggedIn;
public:
    Client() {}
    Client(const std::string& username, const std::string& password, bool loggingIn=true); // Will populate the rest of the fields by querying
    const void addFuelQuote(const double rate, const time_t date);
    const FuelQuote getMostRecentFuelQuote() const;
    const bool buyFuel(); // Purchase the FuelQuote with `id` = `mostRecentFuelQuoteId` and set `purchasedDate` to `time(NULL)`
    std::vector<FuelQuote> getFuelQuoteHistory() const;
    const void updateDatabase(change change_);
    const json toJson();
};
#endif