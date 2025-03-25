#!/bin/bash

# Start halocrm first
echo "Starting halocrm..."
cd halocrm
yarn dev &  # Run in the background
CRM_PID=$!  # Capture the process ID

# Wait until halocrm is fully running
echo "Waiting for halocrm to start..."
while ! nc -z localhost 3000; do
  sleep 2  # Check every 2 seconds
done
echo "halocrm is up!"

# Start haloface after halocrm is confirmed running
cd ../haloface
echo "Starting haloface..."
pnpm run dev &  # Run in the background
HALOFACE_PID=$!

# Wait for both processes to finish
wait $CRM_PID
wait $HALOFACE_PID
