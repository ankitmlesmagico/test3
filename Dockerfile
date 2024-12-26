# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

# Install libvips dependencies
RUN apt-get update && apt-get install -y \
    libvips libvips-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package-lock.json package.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-slim AS production

WORKDIR /app

# Install libvips dependencies (runtime)
RUN apt-get update && apt-get install -y \
    libvips libvips-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --production

COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

EXPOSE 3000

CMD ["npm", "start"]
