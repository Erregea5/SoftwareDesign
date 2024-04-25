#ifndef ________________________________________________
#define ________________________________________________
#include "Client.h"

class FuelQuote {
public:
    unsigned id;       // Primary key
    unsigned clientId; // Foreign key "pointing" to a `Client` object
    int clientLocation;
    double gallonsRequested;
    double companyProfitMargin;
    double rate;
    std::string deliveryDate;
    std::string purchasedDate; // NULL if not purchased

public:
    FuelQuote() {}                                              // Will populate the rest of the fields by querying;
    FuelQuote(const unsigned _id);                                               // Will populate the rest of the fields by querying;
    FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin, const string& _deliveryDate); // Calculate rate, set `date` to `time(NULL)`
    const void updateDatabase();
    const json toJson();
    const double calculateRate(int location, int clientHistory, double gallons);
};

#endif