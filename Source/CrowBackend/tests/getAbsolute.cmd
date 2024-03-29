set REL_PATH=%1
rem
pushd %REL_PATH%
set ABS_PATH=%CD%
rem 
popd

echo %ABS_PATH%