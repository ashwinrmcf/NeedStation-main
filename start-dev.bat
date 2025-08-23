@echo off
echo Starting NeedStation Development Environment...
echo.

REM Check if contact-backend exists and install dependencies if needed
if not exist "contact-backend\node_modules" (
    echo Installing contact backend dependencies...
    cd contact-backend
    call npm install
    cd ..
    echo.
)

REM Check if frontend dependencies are installed
if not exist "Frontend\Need_Station_MP-main\node_modules" (
    echo Installing frontend dependencies...
    cd Frontend\Need_Station_MP-main
    call npm install
    cd ..\..
    echo.
)

REM Start both servers
echo Starting React frontend and Node.js backend...
cd Frontend\Need_Station_MP-main
call npm run dev:full
