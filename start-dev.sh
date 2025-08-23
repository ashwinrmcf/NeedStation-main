#!/bin/bash

echo "Starting NeedStation Development Environment..."
echo

# Check if contact-backend exists and install dependencies if needed
if [ ! -d "contact-backend/node_modules" ]; then
    echo "Installing contact backend dependencies..."
    cd contact-backend
    npm install
    cd ..
    echo
fi

# Check if frontend dependencies are installed
if [ ! -d "Frontend/Need_Station_MP-main/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd Frontend/Need_Station_MP-main
    npm install
    cd ../..
    echo
fi

# Start both servers
echo "Starting React frontend and Node.js backend..."
cd Frontend/Need_Station_MP-main
npm run dev:full
