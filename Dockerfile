FROM node:22.13.1-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Expose ports:
# 19000: Expo DevTools
# 19001: Expo Metro bundler (LAN)
# 19002: Expo web UI
# 5555: Mock JSON server
EXPOSE 19000 19001 19002 5555

# Default command (start expo)
CMD ["npm", "start"]
