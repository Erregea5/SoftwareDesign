@echo off
for /f "delims=" %%a in ('call getAbsolute "../dependencies/catch2/include"') do set "catch=%%a"
for /f "delims=" %%a in ('call getAbsolute "../dependencies/Crow/include"') do set "crow=%%a"
for /f "delims=" %%a in ('call getAbsolute "../dependencies/asio/include"') do set "asio=%%a"
g++.exe -D TEST -fdiagnostics-color=always -fprofile-arcs -ftest-coverage -g test.cpp ..\src\server.cpp ..\src\Client.cpp ..\src\FuelQuote.cpp ..\src\Routes.cpp -o test.exe -I%catch% -I%asio% -I%crow% -pthread -lwsock32 -lws2_32
test.exe
gcov test.cpp -r -o test-server -n

set list=Client FuelQuote Routes server test
for %%b in (%list%) do (
  for /f "delims=" %%a in ('gcov test.cpp -r -n -o test-%%b') do (
    echo %%a
  )
)