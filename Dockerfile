# Use a imagem base do Jenkins
FROM jenkins/jenkins:lts

# Mude para o usuário root para instalar as dependências
USER root

# Instale as dependências necessárias, incluindo curl para o Node.js
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Adicione o repositório do Node.js e instale a versão 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Instale o Expo CLI globalmente
RUN npm install -g expo-cli

# Reverta de volta para o usuário jenkins
USER jenkins
