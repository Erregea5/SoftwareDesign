g++ -fdiagnostics-color=always \
    -std=c++2a \
    -g test.cpp ../src/server.cpp ../src/Client.cpp ../src/FuelQuote.cpp ../src/Routes.cpp \
    -o test.out \
    -I../dependencies/asio/include \
    -I../dependencies/Crow/include \
    -I../dependencies/catch2/include \
    -lpthread

chmod +x ./test.out
./test.out
