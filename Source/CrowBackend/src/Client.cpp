#include "pch.h"
#include "Database.h"

Client::Client(const string& username, const string& password,bool loggingIn)
	: username(username), password(password), id(0), clientHistory(0), clientLocation(0),mostRecentFuelQuoteId(0)
{
	auto rows = database.get_all<Client>(where(c(&Client::username) == username));
	cout<<rows.size()<<username<<endl;
	for(auto &g:rows)cout<<g.username<<endl;
	if (!loggingIn) {// registering new client
		if (rows.size()==0) {
			database.insert(or_abort(),
				into<Client>(),
				columns(&Client::username,&Client::password),
				values(make_tuple(username, password)));
			rows = database.get_all<Client>(where(c(&Client::username) == username));
			if (rows.size() == 0) {
				loggedIn = false;
				return;
			}
			id=rows[0].id;
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
	database.update_all(
		sqlite_orm::set(c(&FuelQuote::purchasedDate) = string(timeChar)),
		where(c(&FuelQuote::id) == mostRecentFuelQuoteId)
	);
	return true;
}

vector<FuelQuote> Client::getFuelQuoteHistory() const
{
	if (!loggedIn)
		return {};
	return database.get_all<FuelQuote>(where(c(&FuelQuote::id) == id));
}

const void Client::updateDatabase(change change_)
{
	if (!loggedIn)
		return;
	switch (change_) {
	case change::password:
		database.update_all(
			sqlite_orm::set(c(&Client::password) = password),
			where(c(&Client::id) == id)
		);
		break;
	case change::clientHistory:
		database.update_all(
			sqlite_orm::set(c(&Client::clientHistory) = clientHistory),
			where(c(&Client::id) == id)
		);
		break;
	case change::clientLocation:
		database.update_all(
			sqlite_orm::set(c(&Client::clientLocation) = clientLocation),
			where(c(&Client::id) == id)
		);
		break;
	case change::mostRecentFuelQuoteId:
		database.update_all(
			sqlite_orm::set(c(&Client::mostRecentFuelQuoteId) = mostRecentFuelQuoteId),
			where(c(&Client::id) == id)
		);
		break;
	}
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
