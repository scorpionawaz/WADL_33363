# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Install express for serving the app
RUN npm install express

# Copy built application from builder stage
COPY --from=builder /app/dist/seat-booking-app/browser ./dist

# Copy server script
COPY server.js .

# Expose port 4200
EXPOSE 4200

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4200', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["node", "server.js"]
