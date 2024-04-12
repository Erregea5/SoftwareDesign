#include "Database.h"

Client::Client(const string& username, const string& password,bool loggingIn)
	: username(username), password(password) 
{
	auto rows = database.get_all<Client>(where(c(&Client::username) == username));
	cout<<rows.size()<<username<<endl;
	for(auto &g:rows)cout<<g.username<<endl;
	if (!loggingIn) {// registering new client
		if (rows.size()==0) {
			clientHistory = ClientHistory::NEW_CUSTOMER;
			clientLocation = ClientLocation::IN_STATE;
			mostRecentFuelQuoteId = 0;
			id = database.insert(*this);
			loggedIn = true;
			return;
		}
		loggedIn = false;
		return;
	}

	//logging in
	if (rows.size() == 0||rows[0].password != password) {
		loggedIn = false;
		return;
	}

	loggedIn = true;
	id = rows[0].id;
	clientLocation = rows[0].clientLocation;
	clientHistory = rows[0].clientHistory;
	mostRecentFuelQuoteId = rows[0].mostRecentFuelQuoteId;
}

const void Client::addFuelQuote(const double rate, const time_t date)
{
	if (!loggedIn)
		return;
	FuelQuote(*this, 1, rate);
}

const FuelQuote Client::getMostRecentFuelQuote() const
{
	if (!loggedIn)
		return FuelQuote(0);
	return FuelQuote(mostRecentFuelQuoteId);
}

const bool Client::buyFuel()
{
	if (!loggedIn || mostRecentFuelQuoteId == 0)
		return false;

	auto now = std::time(0);
	char timeChar[26] = { 0 };
#ifdef WIN32
	ctime_s(timeChar, 26, &now);
#else
	ctime_r(&now, timeChar);
#endif 
	//database.update_all(
	//	sqlite_orm::set(c(&FuelQuote::purchasedDate) = timeChar),
	//	where(c(&FuelQuote::id) == mostRecentFuelQuoteId)
	//);
	return true;
}

vector<FuelQuote> Client::getFuelQuoteHistory() const
{
	if (!loggedIn)
		return {};
	return database.get_all<FuelQuote>(where(c(&FuelQuote::id) == id));
}

const void Client::updateDatabase()
{
	if (!loggedIn)
		return;
	database.update(*this);
}

const json Client::toJson()
{
	return {
		{"id",id},
		{"password",password},
		{"clientLocation",clientLocation},
		{"clientHistory",clientHistory},
		{"mostRecentFuelQuoteId",mostRecentFuelQuoteId}
	};
}
