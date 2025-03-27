#!/bin/bash

# Start halocrm first
echo "Starting halocrm..."
cd halocrm || { echo "Failed to enter halocrm directory"; exit 1; }
yarn dev &  # Run in the background
CRM_PID=$!  # Capture the process ID

# Wait until halocrm is fully running
echo "Waiting for halocrm to start..."
TIMEOUT=30
while ! netstat -an | grep -q ":3000 .*LISTEN"; do
  sleep 2
  ((TIMEOUT--))
  if [ $TIMEOUT -le 0 ]; then
    echo "halocrm failed to start in time. Exiting."
    exit 1
  fi
done
echo "halocrm is up!"

# Start haloface after halocrm is confirmed running
cd ../haloface || { echo "Failed to enter haloface directory"; exit 1; }
echo "Starting haloface..."
pnpm dev &  # Run in the background
HALOFACE_PID=$!

# Wait for both processes to finish
wait $CRM_PID
wait $HALOFACE_PID

echo "Both processes are running."