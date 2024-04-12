g++ -fdiagnostics-color=always \
    -std=c++2a \
    -g \
        src/server.cpp \
        src/Client.cpp \
        src/FuelQuote.cpp \
        src/Routes.cpp \
        src/Database.cpp \
    -o server.out \
    -I dependencies/asio/include \
    -I dependencies/Crow/include \
    -I dependencies/sqlite_orm/include \
    -lpthread -lsqlite3 \
    -fpermissive

# Mac:
# sh ./server.out

# Linux:
# chmod +x ./server.out
# ./server.out