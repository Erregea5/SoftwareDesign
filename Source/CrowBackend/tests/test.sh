g++ -D TEST \
    -fdiagnostics-color=always \
    -std=c++2a \
    -g \
        test.cpp \
        ../src/server.cpp \
        ../src/Client.cpp \
        ../src/FuelQuote.cpp \
        ../src/Routes.cpp \
        ../src/Database.cpp \
    -o test.out \
    -I ../dependencies/asio/include \
    -I ../dependencies/Crow/include \
    -I ../dependencies/catch2/include \
    -I ../dependencies/sqlite_orm/include \
    -I ../src \
    -lpthread -lsqlite3

./test.out