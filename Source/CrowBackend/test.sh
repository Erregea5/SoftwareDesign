g++ -fdiagnostics-color=always \
    -std=c++2a \
    -g tests/test.cpp src/server.cpp src/Client.cpp src/FuelQuote.cpp src/Routes.cpp \
    -o tests/test.out \
    -Idependencies/asio/include \
    -Idependencies/Crow/include \
    -Idependencies/catch2/include \
    -lpthread

# Mac:
# sh ./tests/test.out

# Linux:
# chmod +x ./tests/test.out
# ./tests/test.out