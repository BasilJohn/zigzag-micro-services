# Use Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app using compiled JS
CMD ["node", "dist/server.js"]