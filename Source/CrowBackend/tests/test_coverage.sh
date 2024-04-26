#!/bin/bash

# Function to get the absolute path
getAbsolute() {
    REL_PATH=$1
    cd "$REL_PATH" || exit
    ABS_PATH=$(pwd)
    echo "$ABS_PATH"
}

# Get absolute paths for dependencies
asio=$(getAbsolute "../dependencies/asio/include")
crow=$(getAbsolute "../dependencies/Crow/include")
catch=$(getAbsolute "../dependencies/catch2/include")
sqlite_orm=$(getAbsolute "../dependencies/sqlite_orm/include")

# # Compile and link
# g++ -D TEST \
#     -fdiagnostics-color=always \
#     -std=c++2a \
#     -fprofile-arcs \
#     -ftest-coverage \
#     -g \
#         test.cpp \
#         ../src/server.cpp \
#         ../src/Client.cpp \
#         ../src/FuelQuote.cpp \
#         ../src/Routes.cpp \
#         ../src/Database.cpp \
#     -o test_coverage.out \
#         -I "$asio" \
#         -I "$crow" \
#         -I "$catch" \
#         -I "$sqlite_orm" \
#         -I "../src" \
#         -lpthread -lsqlite3

# Execute the compiled program
./test_coverage.out

# # List of files to iterate over
# list="Client FuelQuote Routes server test Database"
# for b in $list; do
#     for a in $(gcov test.cpp -r -n -o "test_coverage.out-$b"); do
#         echo "$a"
#     done
# done

# echo "$(gcov test.cpp -r -n -o test_coverage.out-Client.gcda)"
# echo "$(gcov test.cpp -r -n -o test_coverage.out-Database.gcda)"
# echo "$(gcov test.cpp -r -n -o test_coverage.out-FuelQuote.gcda)"
# echo "$(gcov test.cpp -r -n -o test_coverage.out-Routes.gcda)"
# echo "$(gcov test.cpp -r -n -o test_coverage.out-server.gcda)"
# echo "$(gcov test.cpp -r -n -o test_coverage.out-test.gcda)"