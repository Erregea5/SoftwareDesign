#ifndef database___
#define database___
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

Storage make_Database();

extern Storage database;
#endif