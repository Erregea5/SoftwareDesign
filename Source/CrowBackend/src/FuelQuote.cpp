#include "Database.h"
#include <iomanip>

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

FuelQuote::FuelQuote(Client& client, const double _gallonsRequested, const double _companyProfitMargin)
	:clientId(client.id),clientLocation(client.clientLocation),
    gallonsRequested(_gallonsRequested), companyProfitMargin(_companyProfitMargin)
{
    id = database.insert(*this);
    client.mostRecentFuelQuoteId = id;
    client.updateDatabase();

    rate = gallonsRequested * companyProfitMargin;
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