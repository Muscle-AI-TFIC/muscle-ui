# Use the official Jenkins LTS image as a base
FROM jenkins/jenkins:lts

# Switch to the root user to install Git
USER root

# Install Git using apt-get
RUN apt-get update && apt-get install -y git

# Switch back to the jenkins user
USER jenkins
