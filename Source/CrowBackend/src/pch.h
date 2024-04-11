#pragma once
#define SQLITE_ENABLE_COLUMN_METADATA
#include <crow.h>
#include <crow/middlewares/cors.h>
#include <sqlite3.h>
#include <sqlite_orm.h>
using namespace std;

typedef crow::json::wvalue json;
typedef crow::json::rvalue readJson;

enum ClientLocation {
    IN_STATE=0,
    OUT_OF_STATE=1,
};
enum ClientHistory {
    EXISTING_CUSTOMER=0,
    NEW_CUSTOMER=1,
};