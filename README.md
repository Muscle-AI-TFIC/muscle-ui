[![Muscle-ai CI](https://github.com/Muscle-AI-TFIC/muscle-ui/actions/workflows/main.yml/badge.svg)](https://github.com/Muscle-AI-TFIC/muscle-ui/actions/workflows/main.yml)

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Jenkins Setup

To set up and run the Jenkins master and agent using Docker Compose, and ensure the agent has proper Docker permissions, follow these steps:

1.  **Start Jenkins Master and Agent (Initial Setup):**
    ```bash
    docker compose up -d
    ```

2.  **Configure Jenkins Agent Dynamically (for Docker Permissions):**
    The Jenkins agent needs access to the host's Docker daemon. To ensure this works across different machines, the agent's Docker group ID needs to match the host's.

    a.  **Get the Docker Group ID (GID) from your host machine:**
        ```bash
        DOCKER_GID=$(getent group docker | cut -d: -f3)
        ```

    b.  **Build the `jenkins-agent` image, passing the host's GID:**
        ```bash
        docker compose build --build-arg DOCKER_GID=$DOCKER_GID agent
        ```

    c.  **Restart the `jenkins-agent` container:**
        ```bash
        docker compose up -d agent
        ```

    These steps ensure that the `jenkins-agent` container is built with the correct Docker group permissions, allowing it to interact with the host's Docker daemon.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
