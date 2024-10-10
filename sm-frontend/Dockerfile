# # Use the official Node.js image
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Update npm
# RUN npm install -g npm@latest

# # Copy package.json and package-lock.json (if present)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the Next.js application
# RUN npm run build

# # Expose the port that the application will run on
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]

# Use the official Node.js 18 alpine image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install necessary dependencies for Alpine and build process
RUN apk add --no-cache libc6-compat

# Copy only the package.json and package-lock.json files to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Install dev dependencies required for the build (like tailwindcss, etc.)
RUN npm install tailwindcss postcss autoprefixer

# Build the Next.js application
RUN npm run build

# Expose port 3000 to be accessed outside the container
EXPOSE 3000

# Define the command to start the Next.js server
CMD ["npm", "run", "start"]
