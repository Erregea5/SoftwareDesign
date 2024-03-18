#pragma once
#include <crow.h>
#include <crow/middlewares/cors.h>
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

extern json database;