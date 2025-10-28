FROM jenkins/inbound-agent:latest

USER root
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -g 984 docker \
    && usermod -aG docker jenkins

USER jenkins
