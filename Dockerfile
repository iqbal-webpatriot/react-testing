# Stage 1: Builder - Install ALL dependencies (including dev)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install  # Installs both dependencies and devDependencies
COPY . .
RUN npm run build

# Stage 2: Production - Only install runtime dependencies
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

# Install ONLY production dependencies
RUN npm ci --only=production

# Runtime configuration
EXPOSE 3000
CMD ["node", "build/index.js"]