#ifndef _______________________________________________sebastiansucks
#define _______________________________________________sebastiansucks
#include "FuelQuote.h"

namespace Routes { // All views are for external use (+ API)
    const json login(const std::string& username, const std::string& password);
    const json _register(const std::string& username, const std::string& password);
    const json profileManagement(const std::string& username, const std::string& password, const readJson& changes);
    const json predictRateOfFuel(const std::string& username, const std::string& password, const double gallonsRequested, const double companyProfitMargin, const string& delivery); // Calls `FuelQuote` constructor, calls `Client` constructor, call functions in classes that update the database, return json of `Client` and `FuelQuote`
    const bool fulfillPurchase(const std::string& username, const std::string& password);
    const json getFuelQuoteHistory(const std::string& username, const std::string& password);
};

#endif