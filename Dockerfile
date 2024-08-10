# Use an official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the app with nodemon
CMD ["npm", "run", "dev"]
