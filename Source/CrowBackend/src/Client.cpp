#include "Client.h"
#include "FuelQuote.h"

Client::Client(const string& username, const string& password,bool loggingIn)
	: username(username), password(password) 
{
	json client = database["Client"][username];
	if (client.count("password") < 1 && !loggingIn) {//new client
		id = stoi(database["ClientCurID"].dump());
		database["ClientCurID"] = id + 1;

		clientHistory = ClientHistory::NEW_CUSTOMER;
		clientLocation = ClientLocation::IN_STATE;
		mostRecentFuelQuoteId = 0;

		updateDatabase();
		loggedIn = false;
		return;
	}
	if (client["password"].getString() != password) {
		loggedIn = false;
		return;
	}

	loggedIn = true;
	id = ClientLocation(stoi(client["id"].dump()));
	cout << client["clientLocation"].dump() << endl;
	clientLocation = stoi(client["clientLocation"].dump()) == 0 ?
		ClientLocation::IN_STATE : ClientLocation::OUT_OF_STATE;
	clientHistory = stoi(client["clientHistory"].dump()) == 0 ?
		ClientHistory::EXISTING_CUSTOMER : ClientHistory::NEW_CUSTOMER;
	mostRecentFuelQuoteId = stoi(client["mostRecentFuelQuoteId"].dump());
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

	auto now = time(0);
	char timeChar[26] = { 0 };
	ctime_s(timeChar, 26, &now);
	database["FuelQuote"][mostRecentFuelQuoteId]["purchasedDate"]= string(timeChar);
	return true;
}

vector<FuelQuote> Client::getFuelQuoteHistory() const
{
	vector<FuelQuote> history;
	if (!loggedIn)
		return history;
	int numQuotes = stoi(database["FuelQuoteCurID"].dump());
	for (int i = 1;i < numQuotes;i++)
		if (stoi(database["FuelQuote"][i]["clientId"].dump()) == id)
			history.push_back(FuelQuote(i));

	return history;
}

const void Client::updateDatabase()
{
	if (!loggedIn)
		return;
	database["Client"][username] = json(toJson());
}

const void Client::updateDatabase(const json& newData)
{
	if (!loggedIn)
		return;
	database["Client"][username] = json(newData);
}

const json Client::toJson()
{
	return {
		{"id",id},
		{"password",password},
		{"clientLocation",clientLocation==ClientLocation::IN_STATE?0:1},
		{"clientHistory",clientHistory==ClientHistory::EXISTING_CUSTOMER?0:1},
		{"mostRecentFuelQuoteId",mostRecentFuelQuoteId}
	};
}
