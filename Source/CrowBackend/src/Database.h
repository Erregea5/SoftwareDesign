#pragma once
#include "Client.h"
#include "FuelQuote.h"

using namespace sqlite_orm;
typedef sqlite_orm::internal::storage_t<
    sqlite_orm::internal::table_t<
        sqlite_orm::internal::member_object_type_t<unsigned int Client::*>, false,
        sqlite_orm::internal::column_t<unsigned int Client::*, sqlite_orm::internal::empty_setter, sqlite_orm::internal::primary_key_with_autoincrement<sqlite_orm::internal::primary_key_t<>>>,
        sqlite_orm::internal::column_t<std::string Client::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<std::string Client::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<int Client::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<unsigned int Client::*, sqlite_orm::internal::empty_setter>>,
    sqlite_orm::internal::table_t<
        sqlite_orm::internal::member_object_type_t<unsigned int FuelQuote::*>, false,
        sqlite_orm::internal::column_t<unsigned int FuelQuote::*, sqlite_orm::internal::empty_setter, sqlite_orm::internal::primary_key_with_autoincrement<sqlite_orm::internal::primary_key_t<>>>,
        sqlite_orm::internal::column_t<unsigned int FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<std::string FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<std::string FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<double FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<double FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<int FuelQuote::*, sqlite_orm::internal::empty_setter>,
        sqlite_orm::internal::column_t<double FuelQuote::*, sqlite_orm::internal::empty_setter>
    >
> Storage;

auto makeDatabase = [] {
    return make_storage("db.sqlite",
        make_table("Clients",
            make_column("Client_ID", &Client::id, primary_key().autoincrement()),
            make_column("Username", &Client::username),
            make_column("Password", &Client::password),
            make_column("Location", &Client::clientLocation),
            make_column("Most_Recent_Fuel_Quote_ID", &Client::mostRecentFuelQuoteId)
        ),
        make_table("Fuel_Quotes",
            make_column("Fuel_Quote_ID", &FuelQuote::id, primary_key().autoincrement()),
            make_column("Client_ID", &FuelQuote::clientId),
            make_column("Date", &FuelQuote::date),
            make_column("Purchase_Date", &FuelQuote::purchasedDate),
            make_column("Gallons_Requested", &FuelQuote::gallonsRequested),
            make_column("Company_Profit_Margin", &FuelQuote::companyProfitMargin),
            make_column("Client_Location", &FuelQuote::clientLocation),
            make_column("Rate", &FuelQuote::rate)
        )
    );
};

extern Storage database;