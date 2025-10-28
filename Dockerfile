FROM jenkins/inbound-agent:latest

ARG DOCKER_GID=999 # Default GID, will be overridden

USER root
RUN apt-get update && apt-get install -y \
    docker-cli \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -g ${DOCKER_GID} docker \
    && usermod -aG docker jenkins

USER jenkins
