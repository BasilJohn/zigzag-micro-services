# Use Node.js 18 base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose your service port (optional for internal use)
EXPOSE 3031

# Run the application
CMD ["npm", "run", "dev"]