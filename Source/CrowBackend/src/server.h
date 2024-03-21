#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"

#define MISSING_CREDENTIALS json{ {"error","Missing Credentials"} }
#define MISSING_DATA json{ {"error","Missing Data"} }
#define SUCCESS "success"
#define FAILURE "failure"

class Auth {
public:
    std::string username,
        password;
    readJson data;
    bool empty = false;
public:
    Auth(const crow::request& req);
};

void setupServer(crow::App<crow::CORSHandler>& app);