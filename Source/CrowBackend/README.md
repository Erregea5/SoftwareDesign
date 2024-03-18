download asio and Crow source and place it inside an include folder for each
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
IDK for linux/macOs :P
you'll probably just need to replace
-pthread -lwsock32 -lws2_32
with your platform libraries


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