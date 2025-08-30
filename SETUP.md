## 🐳 Docker Development Setup

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your system
  > Docker Desktop includes both Docker Engine and Docker Compose, plus a GUI for easier management.
- If you're using Linux, you can install Docker and Docker Compose separately. See [Install Docker Engine on Linux](https://docs.docker.com/engine/install/)

<br>

### Getting Started

1. **Clone the repository (if you haven't already):**

   ```bash
   git clone <repository-url>
   cd phisio-log-frontend-mob
   ```

   ⚠️ While dependencies are handled inside Docker, we recommend installing them locally too for IDE features like linting and autocomplete.
   - Use `npm ci` or `yarn install --immutable`
   - Avoid plain `npm install` or `yarn install`

2. **Configure environment variables:**

   Rename `.env.example` in the project root to `.env`, then update following placeholders:
   - Set `EXPO_PUBLIC_HOST_IP=<host_ip_placeholder>` to your machine’s local LAN IP (e.g., 192.168.1.4)
   - Set `EXPO_TOKEN=<token_placeholder>` to the shared Expo token found in `ASSETS.md` within `internal` repo

3. **Build and start the app:**

   Note that first build will take a bit longer since all base images and dependencies need to be pulled and installed. Subsequent runs will be much faster.

   ```bash
   docker compose up
   ```

   You can now access the application either in the browser (web) using the provided URL, or on a mobile device with the Expo Go app by scanning the QR code shown in the terminal.

   > ℹ️ Make sure your mobile device is connected to the same Wi-Fi network as your dev machine when scanning the QR code in Expo Go.

<br>

### Stopping/Starting the Application after initial build

- This pauses the containers but keeps their state and data.

  ```bash
  docker compose stop   # Stop all running containers (services, e.g. expo and mock-api)
  ```

- This resumes containers without re-running initialization scripts or showing the Expo QR code/Metro logs in your terminal.

  ```bash
  docker compose start  # Start containers again in the background (no QR code or Metro interface - ok if you don't need either)
  ```

- This re-runs containers displaying QR code and Metro logs in your terminal, which is useful for development and debugging.

  ```bash
  docker compose up     # Start containers with logs, QR code, and Metro interface (recommended for development)
  ```

- **To stop all running services and remove associated containers and networks:**

  ```bash
  docker compose down  # Use this if you want to reset environment, e.g. after experiencing some issues (quick reset followed by `docker compose up`)
  ```

ℹ️ **Summary:**

- Use `docker compose stop` / `docker compose start` for quick pauses/resumes (no logs/QR code)
- Use `docker compose stop` / `docker compose up` for a full dev experience (logs, QR code, Metro) - recommended
- Use `docker compose down` / `docker compose up` to remove everything and start clean (causes an app to bundle up a bit slower opening dev server first time)

<br>

### Rebuilding the Application

Rebuild when:

- You change the Dockerfile
- Add/remove dependencies and update build-related files (package.json, .env)
- Experience issues

  ```bash
  docker compose up --build
  ```

- If issues persist, do a clean rebuild from scratch (paste & run the following block):

  ```bash
  docker compose down --rmi all &&
  docker compose build --no-cache &&
  docker compose up
  ```
