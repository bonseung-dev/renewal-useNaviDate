# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/back-end/package*.json ./apps/back-end/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build:shared && npm run build:nest

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/back-end/package*.json ./apps/back-end/
COPY packages/shared/package*.json ./packages/shared/

# Install production dependencies only
RUN npm install --production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:nest"] 