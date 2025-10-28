FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \ 
    && rm -rf /var/lib/apt/lists/*

USER jenkins

EXPOSE 8080 50000