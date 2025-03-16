# Start of Selection
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application with Redis and Postgres configurations
CMD ["npm", "start", "--", "--redis-host", "${REDIS_HOST}", "--postgres-uri", "${POSTGRES_URI}"]
# End of Selection
