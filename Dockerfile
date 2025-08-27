FROM node:22.13.1-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Expose expo metro bundler (dev server)
EXPOSE 8081

CMD ["npm", "start"]
