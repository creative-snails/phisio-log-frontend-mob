FROM node:22.13.1-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 8081

CMD ["npx", "expo", "start", "--host", "lan"]
