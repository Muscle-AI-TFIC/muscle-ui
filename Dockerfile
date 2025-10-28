FROM jenkins/inbound-agent:latest

USER root
RUN apt-get update && apt-get install -y \
    docker.io \
    && rm -rf /var/lib/apt/lists/* \
    && usermod -aG docker jenkins

USER jenkins
