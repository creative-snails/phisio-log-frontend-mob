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

   Note that initial build will take longer since all base images and dependencies need to be pulled and installed. Subsequent runs will be much faster.

   ```bash
   docker compose up    # add -d for detached mode (background mode) - leaves terminal free
   ```

   You can now access the application either in the browser (web) using the provided URL, or on a mobile device with the Expo Go app by scanning the QR code shown in the terminal.

   > ℹ️ Make sure your mobile device is connected to the same Wi-Fi network as your dev machine when scanning the QR code in Expo Go.

<br>

### Stopping & Starting the Application after initial build/run

- To stop or remove services/containers:

  ```bash
  docker compose stop   # Stop all running containers/services (e.g. expo and mock-api)
  # or
  docker compose down   # Remove all running containers/services and their associated networks
  ```

- To start containers/services again:

  ```bash
  docker compose start  # Start all stopped containers/services (no QR code or Metro interface shown) - only if 'docker compose stop' was run
  # or
  docker compose up     # Start containers/services with logs, QR code, and Metro interface - must be used if 'docker compose down' was run
  ```

ℹ️ **Summary:**

- Use `docker compose stop` / `docker compose start` for quick pauses/resumes (no logs/QR code shown unless `docker compose logs` is run afterwards)
- Use `docker compose stop` / `docker compose up` for a full dev experience (logs, QR code, Metro) - recommended (no need to run `docker compose logs`)
- Use `docker compose down` to stop and remove services and their networks in case you need to free up resources (followed by `docker compose up` to start again)
- Use `docker compose restart` if you need to restart the services (e.g., after changing environment variables in compose.yml or running into issues)

<br>

### Rebuilding the Application

Rebuild when:

- Dockerfile is modified
- Dependencies are added/removed or build-related files updated (package.json, package-lock.json, .env)
- Issues are experienced even after running `docker compose restart`

  ```bash
  docker compose up --build
  ```

* If issues still persist, do a clean rebuild from scratch (paste & run the following block):

  ```bash
  docker compose down --rmi all &&
  docker compose build --no-cache &&
  docker compose up
  ```
