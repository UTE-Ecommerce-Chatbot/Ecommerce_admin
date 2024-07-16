# # Stage 1: Build the React app
# FROM node:16 as build

# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the app's source code and build the app
# COPY . .
# RUN npm run build

# # Stage 2: Serve the React app with Nginx
# FROM nginx:alpine

# # Copy the build output to the Nginx html directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy custom Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 3001 to the outside world
# EXPOSE 3001

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install yarn globally
RUN if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the app's source code and build the app
COPY . .

# Build the app
RUN yarn build

# Expose port 3000 to the outside world
EXPOSE 3001

# Command to run the app
CMD ["yarn", "start"]