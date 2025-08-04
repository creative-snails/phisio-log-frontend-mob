FROM node:22.13.1-alpine3.21

RUN addgroup -S phisiomobgroup && adduser -S phisiomobuser -G phisiomobgroup

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Install Expo CLI globally
RUN npm install -g @expo/cli

COPY . .
RUN chown -R phisiomobuser:phisiomobgroup /app

USER phisiomobuser

EXPOSE 8081 5555
