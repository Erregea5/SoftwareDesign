#include "pch.h"
#include "Database.h"

Client::Client(const string& username, const string& password,bool loggingIn)
	: username(username), password(password), id(0), clientLocation(0),mostRecentFuelQuoteId(0)
{
	auto rows = database.get_all<Client>(where(c(&Client::username) == username));
	cout<<rows.size()<<username<<endl;
	for(auto &g:rows)cout<<g.username<<endl;
	if (!loggingIn) {// registering new client
		if (rows.size()==0) {
			database.insert(or_abort(),
				into<Client>(),
				columns(
					&Client::username,
					&Client::password,
					&Client::clientLocation
				),
				values(make_tuple(username, password, 1)));
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
	mostRecentFuelQuoteId = rows[0].mostRecentFuelQuoteId;
	fullName = rows[0].fullName;
	state = rows[0].state;
	city = rows[0].city;
	zipcode = rows[0].zipcode;
	address1 = rows[0].address1;
	address2 = rows[0].address2;
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
	return database.get_all<FuelQuote>(where(c(&FuelQuote::clientId) == id));
}

const void Client::update(std::string Client::*member, const std::string& val)
{
	this->*member = val;
	database.update_all(
		sqlite_orm::set(c(member) = this->*member), where(c(&Client::id) == id)
	);
}

const void Client::update(unsigned Client::*member, unsigned val)
{
	this->*member = val;
	database.update_all(
		sqlite_orm::set(c(member) = this->*member), where(c(&Client::id) == id)
	);
}

const json Client::toJson()
{
	return {
		{"id",id},
		{"password",password},
		{"clientLocation",clientLocation},
		{"fullName",fullName},
		{"state",state},
		{"city",city},
		{"zipcode",zipcode},
		{"address1",address1},
		{"address2",address2},
		{"mostRecentFuelQuoteId",mostRecentFuelQuoteId}
	};
}
