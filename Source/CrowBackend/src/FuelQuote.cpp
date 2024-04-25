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
    deliveryDate = rows[0].deliveryDate;
    purchasedDate = rows[0].purchasedDate;
}

const double FuelQuote::calculateRate(int location, int clientHistory, double gallons) {
    const double CURRENT_PRICE_PER_GALLON = 1.5;
    const double locationFactor = location == 0 ? 0.02 : 0.04; // Texas is 0, out-of-state is 1
    const double rateHistoryFactor = clientHistory ? .01 : 0;
    const double gallonsRequestedFactor = gallons > 1000 ? 0.02 : 0.03;
    const double companyProfitFactor = 0.1;
    const double margin = CURRENT_PRICE_PER_GALLON * (
        locationFactor -
        rateHistoryFactor +
        gallonsRequestedFactor + 
        companyProfitFactor
    );
    const double suggestedPricePerGallon = CURRENT_PRICE_PER_GALLON + margin;
    return suggestedPricePerGallon;
}

FuelQuote::FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin, const string& _deliveryDate) :
	clientId(client.id),
    clientLocation(client.clientLocation),
    gallonsRequested(_gallonsRequested),
    companyProfitMargin(_companyProfitMargin),
    deliveryDate(_deliveryDate),
    purchasedDate("null")
{
    const auto fuelQuoteHistory = database.get_all<FuelQuote>(where(c(&FuelQuote::clientId) == client.id));
    int clientHistory = fuelQuoteHistory.size() > 0 ? 1 : 0;

    id = database.insert(*this);
    client.update(&Client::mostRecentFuelQuoteId,id);

    rate = calculateRate(clientLocation, clientHistory, gallonsRequested);

    updateDatabase();
}

const void FuelQuote::updateDatabase()
{
    database.update(*this);
}

const json FuelQuote::toJson()
{
    return {
        {"id",id},
        {"clientId",clientId},
        {"clientLocation",clientLocation},
        {"gallonsRequested",gallonsRequested},
        {"companyProfitMargin",companyProfitMargin},
        {"rate",rate},
        {"deliveryDate",deliveryDate},
        {"purchasedDate",purchasedDate}
    };
}