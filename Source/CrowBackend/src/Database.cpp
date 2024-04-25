#include "pch.h"
#include "Database.h"
Storage make_Database() {
    return make_storage("/home/ubuntu/SoftwareDesign/Source/CrowBackend/db.sqlite",
        make_table("Clients",
            make_column("Client_ID", &Client::id, primary_key().autoincrement()),
            make_column("Username", &Client::username, unique()),
            make_column("Password", &Client::password),
            make_column("Location", &Client::clientLocation),
            make_column("Full_Name", &Client::fullName),
            make_column("Zipcode",&Client::zipcode),
            make_column("City",&Client::city),
            make_column("State", &Client::state),
            make_column("Address_2", &Client::address2),
            make_column("Address_1", &Client::address1),
            make_column("Most_Recent_Fuel_Quote_ID", &Client::mostRecentFuelQuoteId),
            foreign_key(&Client::mostRecentFuelQuoteId).references(&FuelQuote::id)
        ),
        make_table("Fuel_Quotes",
            make_column("Fuel_Quote_ID", &FuelQuote::id, primary_key().autoincrement()),
            make_column("Client_ID", &FuelQuote::clientId),
            make_column("Date", &FuelQuote::deliveryDate),
            make_column("Purchase_Date", &FuelQuote::purchasedDate),
            make_column("Gallons_Requested", &FuelQuote::gallonsRequested),
            make_column("Company_Profit_Margin", &FuelQuote::companyProfitMargin),
            make_column("Client_Location", &FuelQuote::clientLocation),
            make_column("Rate", &FuelQuote::rate),
            foreign_key(&FuelQuote::clientId).references(&Client::id)
        )
    );
}
