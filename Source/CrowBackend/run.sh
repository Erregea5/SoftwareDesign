g++ -fdiagnostics-color=always \
    -std=c++2a \
    -g src/server.cpp src/Client.cpp src/FuelQuote.cpp src/Routes.cpp \
    -o server.out \
    -Idependencies/asio/include \
    -Idependencies/Crow/include \
    -lpthread

# Mac:
# sh ./server.out

# Linux:
# chmod +x ./server.out
# ./server.out