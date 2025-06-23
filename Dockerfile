# Stage 1: Builder - Install ALL dependencies (including dev)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production - Only install runtime dependencies
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV production

# 1. Disable husky by default
ENV HUSKY=0

# 2. Copy only production files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

# 3. Install production deps with ignore-scripts flag
RUN npm ci --only=production --ignore-scripts

# Runtime configuration
EXPOSE 3000
CMD ["node", "build/index.js"]