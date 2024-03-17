#pragma once
#include "pch.h"

class FuelQuote;

class Client {
public:
    unsigned id;
    const string username;
    const string password;
    ClientLocation clientLocation;
    ClientHistory clientHistory;
    unsigned mostRecentFuelQuoteId; // Foreign key "pointing" to a `FuelQuote`'s `id`
    bool loggedIn;
public:
    Client(const string& username, const string& password, bool loggingIn=true); // Will populate the rest of the fields by querying
    const void addFuelQuote(const double rate, const time_t date);
    const FuelQuote getMostRecentFuelQuote() const;
    const bool buyFuel(); // Purchase the FuelQuote with `id` = `mostRecentFuelQuoteId` and set `purchasedDate` to `time(NULL)`
    vector<FuelQuote> getFuelQuoteHistory() const;
    const void updateDatabase();
    const void updateDatabase(const json& newData);
    const json toJson();
};