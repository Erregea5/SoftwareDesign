#include "pch.h"
#include "Database.h"

FuelQuote::FuelQuote(unsigned int _id)
    :id(_id)
{
    auto rows = database.get_all<FuelQuote>(where(c(&FuelQuote::id) == id));
    if (rows.size()==0)
        return;
    clientId = rows[0].clientId;
    clientLocation = ClientLocation(rows[0].clientLocation);
    gallonsRequested = rows[0].gallonsRequested;
    companyProfitMargin = rows[0].companyProfitMargin;
    rate = rows[0].rate;
    date = rows[0].date;
    purchasedDate = rows[0].purchasedDate;
}

// change this one 
FuelQuote::FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin)
	:clientId(client.id),clientLocation(client.clientLocation),
    gallonsRequested(_gallonsRequested), companyProfitMargin(_companyProfitMargin)
{
    id = database.insert(*this);
    client.mostRecentFuelQuoteId = id;
    client.updateDatabase(change::mostRecentFuelQuoteId);

    rate = calculateRate(clientLocation, gallonsRequested);
    auto now = std::time(0);
    char timeChar[26] = { 0 };
#ifdef WIN32
    ctime_s(timeChar, 26, &now);
#else
    ctime_r(&now, timeChar);
#endif 
    date = string(timeChar);
    purchasedDate = "null";

    updateDatabase();
}

double calculateRate(int location, double gallons) const { // Pass required parameters to calculateRate
        const double currentPricePerGallon = 1.5; // Constant price per gallon
        const double locationFactor = location == 1 ? 0.02 : 0.04; // Assuming Texas is 1, others are 0
        const double rateHistoryFactor = 0; // No history factor in C++
        const double gallonsRequestedFactor = gallons > 1000 ? 0.02 : 0.03;
        const double companyProfitFactor = 0.1;

        // Calculate the margin
        const double margin =
            (locationFactor -
                rateHistoryFactor +
                gallonsRequestedFactor +
                companyProfitFactor) *
            currentPricePerGallon;

        // Calculate the suggested price per gallon
        const double suggestedPricePerGallon = currentPricePerGallon + margin;

        return gallons * suggestedPricePerGallon;
    }

const void FuelQuote::updateDatabase()
{
    database.update(*this);
}

const json FuelQuote::toJson()
{
    return {
        {"clientId",clientId},
        {"clientLocation",clientLocation},
        {"gallonsRequested",gallonsRequested},
        {"companyProfitMargin",companyProfitMargin},
        {"rate",rate},
        {"date",date},
        {"purchasedDate",purchasedDate}
    };
}