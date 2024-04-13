#ifndef _______________________________________________sebastiansucksforsure
#define _______________________________________________sebastiansucksforsure
#include "Routes.h"
#include "Client.h"
#include "FuelQuote.h"
/*
namespace crow {
    class request;
    class CORSHandler;
    template<class T>
    class App;
}
class readJson;
*/
#define MISSING_CREDENTIALS json{ {"error","Missing Credentials"} }
#define MISSING_DATA json{ {"error","Missing Data"} }
#define INPUT_MISMATCH json{{"error", "Input Mismatch"}}
#define SUCCESS json{{"status", "success"}}
#define FAILURE json{{"status", "failure"}}

class Auth {
public:
    std::string username,
        password;
    readJson data;
    bool empty = false;
public:
    Auth(const crow::request& req);
};

void setupDatabase();
void setupServer(crow::App<crow::CORSHandler>& app);

#endif