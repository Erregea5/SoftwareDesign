#!/bin/bash

# Function to get the absolute path
getAbsolute() {
    REL_PATH=$1
    cd "$REL_PATH" || exit
    ABS_PATH=$(pwd)
    echo "$ABS_PATH"
}

# Get absolute paths for dependencies
catch=$(getAbsolute "../dependencies/catch2/include")
crow=$(getAbsolute "../dependencies/Crow/include")
asio=$(getAbsolute "../dependencies/asio/include")

# Compile and link
g++ -D TEST -fdiagnostics-color=always -fprofile-arcs -ftest-coverage -g test.cpp ../src/server.cpp ../src/Client.cpp ../src/FuelQuote.cpp ../src/Routes.cpp -o test.exe -I"$catch" -I"$asio" -I"$crow" -pthread -lwsock32 -lws2_32

# Execute the compiled program
./test.exe

# List of files to iterate over
list="Client FuelQuote Routes server test"
for b in $list; do
    for a in $(gcov test.cpp -r -n -o test-"$b"); do
        echo "$a"
    done
done
