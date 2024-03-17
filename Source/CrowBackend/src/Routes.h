#pragma once
#include "pch.h"

class Client;

namespace Routes { // All views are for external use (+ API)
    const json login(const string& username, const string& password);
    const bool _register(const string& username, const string& password);
    const json profileManagement(const string& username, const string& password, const readJson& changes);
    const json predictRateOfFuel(const string& username, const string& password, const double gallonsRequested, const double companyProfitMargin); // Calls `FuelQuote` constructor, calls `Client` constructor, call functions in classes that update the database, return json of `Client` and `FuelQuote`
    const bool fulfillPurchase(const string& username, const string& password);
    const json getFuelQuoteHistory(const string& username, const string& password);
};
