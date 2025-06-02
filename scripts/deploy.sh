#!/bin/bash

echo "Starting deployment..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

echo "Cleaning up old files on server..."
ssh root@dj-elliott.com "rm -rf /var/www/html/*"
if [ $? -ne 0 ]; then
    echo "Clean up failed. Exiting."
    exit 1
fi

echo "Build successful. Deploying to server..."
scp -r dist/* root@dj-elliott.com:/var/www/html/
if [ $? -ne 0 ]; then
    echo "Deployment failed. Exiting."
    exit 1
fi

echo "Deployment successful. Restarting server..."
ssh root@dj-elliott.com "sudo systemctl restart apache2"

echo "Deployment complete!"