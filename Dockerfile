FROM jenkins/inbound-agent:latest

USER root
RUN apt-get update && apt-get install -y \
    docker.io \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -g 999 docker \
    && usermod -aG docker jenkins

USER jenkins
