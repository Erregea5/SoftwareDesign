#pragma once
#include "pch.h"

class FuelQuote;

class Client {
public:
    unsigned id;
    string username;
    string password;
    int clientLocation;
    int clientHistory;
    unsigned mostRecentFuelQuoteId; // Foreign key "pointing" to a `FuelQuote`'s `id`
    bool loggedIn;
public:
    Client() {}
    Client(const string& username, const string& password, bool loggingIn=true); // Will populate the rest of the fields by querying
    const void addFuelQuote(const double rate, const time_t date);
    const FuelQuote getMostRecentFuelQuote() const;
    const bool buyFuel(); // Purchase the FuelQuote with `id` = `mostRecentFuelQuoteId` and set `purchasedDate` to `time(NULL)`
    vector<FuelQuote> getFuelQuoteHistory() const;
    const void updateDatabase();
    const json toJson();
};