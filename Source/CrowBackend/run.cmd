g++.exe -fdiagnostics-color=always -g src\server.cpp src\Client.cpp src\FuelQuote.cpp src\Routes.cpp -o server.exe -Idependencies\asio\include -Idependencies\Crow\include -pthread -lwsock32 -lws2_32
./server.exe