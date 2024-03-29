#pragma once
#include "pch.h"

class Client;

class FuelQuote {
public:
    unsigned id;       // Primary key
    unsigned clientId; // Foreign key "pointing" to a `Client` object
    ClientLocation clientLocation;
    double gallonsRequested;
    double companyProfitMargin;
    double rate;
    string date;
    string purchasedDate; // NULL if not purchased

public:
    FuelQuote(const unsigned _id);                                               // Will populate the rest of the fields by querying;
    FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin); // Calculate rate, set `date` to `time(NULL)`
    const void updateDatabase();
    const json toJson();
};