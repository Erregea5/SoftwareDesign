g++ -fdiagnostics-color=always \
    -std=c++2a \
    -g src/server.cpp src/Client.cpp src/FuelQuote.cpp src/Routes.cpp \
    -o src/server.out \
    -Idependencies/asio/include \
    -Idependencies/Crow/include \
    -lpthread

# Mac:
# sh ./src/server.out

# Linux:
# chmod +x ./src/server.out
# ./src/server.out