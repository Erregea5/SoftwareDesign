download asio, Crow, Catch2, sqlite3, and sqlite3_orm include source and place include folder in dependencies for each
if you're on linux you can apt install libsqlite3-dev
```c
-Crow
  |
  |-include
      |
      |-crow.h
      |-crow
         |
         |-etc...
```

To run use CrowBackend.sln or run.cmd on Windows
and run.sh for linux and MaxOs

Theres a cors related bug in crow LOL.
To fix you have to go to dependencies\Crow\include\crow\routing.h 
in the handle_initial function go to 
```cpp 
else if (req.method == HTTPMethod::Options){
```
and right under it copy paste:
```cpp
auto addCors = [](response& res) {
    res.set_header("Access-Control-Allow-Methods", "*");
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
};
```
then for the 2 times that you see 
```cpp
res = response(204);
``` 
and the one time you see 
```cpp
res = response(404); 
```
call 
```cpp
addCors(res)
```
right after

Also I added a function in crow/json.h
copy 
```cpp
std::string getString(){
  return s;
}
```
in public of wvalue