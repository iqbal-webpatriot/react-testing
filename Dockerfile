# -------- Stage 1: Build React App --------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app for production
RUN npm run build

# -------- Stage 2: Serve with http-server --------
FROM node:18-alpine AS production

WORKDIR /app

# Install a lightweight static server
RUN npm install -g http-server

# Copy built files from builder
COPY --from=builder /app/build /app/build

EXPOSE 3000

# Serve the React app
CMD ["http-server", "build", "-p", "3000"]
