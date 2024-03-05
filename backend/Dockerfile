FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose port
EXPOSE 5000

# Command to run the server
CMD ["npm", "start"]
