#include "FuelQuote.h"
#include "Client.h"
#include <iomanip>

FuelQuote::FuelQuote(unsigned int _id)
    :id(_id)
{
    json quote = database["FuelQuote"][id];
    if (quote.count("clientId") < 1)
        return;
    clientId = stoi(quote["clientId"].dump());
    clientLocation = ClientLocation(stoi(quote["clientLocation"].dump()));
    gallonsRequested = stof(quote["gallonsRequested"].dump());
    companyProfitMargin = stof(quote["companyProfitMargin"].dump());
    rate = stof(quote["rate"].dump());
    date = quote["date"].getString();
    purchasedDate = quote["purchasedDate"].getString();
}

FuelQuote::FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin)
	:clientId(client.id),clientLocation(client.clientLocation),
    gallonsRequested(_gallonsRequested), companyProfitMargin(_companyProfitMargin)
{
	id = stoi(database["FuelQuoteCurID"].dump());
	database["FuelQuoteCurID"] = id + 1;
    client.mostRecentFuelQuoteId = id;
    client.updateDatabase();

    rate = gallonsRequested * companyProfitMargin;
    auto now = time(0);
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

const void FuelQuote::updateDatabase()
{
    database["FuelQuote"][id] = json(toJson());
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
