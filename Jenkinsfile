pipeline {
    agent any

    tools {
        // Define a versão do Node.js a ser usada no pipeline
        nodejs 'NodeJS_20'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Muscle-AI-TFIC/muscle-ui'
            }
        }
        
        // Estágio para instalar as dependências do projeto
        stage('Install Dependencies') {
            steps {
                // Executa o npm install para baixar os pacotes necessários
                sh 'npm install'
            }
        }

        // Estágio para executar a verificação de lint
        stage('Lint') {
            steps {
                // Usa o script de lint do package.json
                sh 'npm run lint'
            }
        }

        // Estágio para executar os testes unitários
        stage('Test') {
            steps {
                // Usa o script de teste do package.json
                sh 'npm test'
            }
        }

        stage('Security Audit') {
        steps {
            echo "Running npm audit..."
            sh "npm audit --json --audit-level=high || true"
        }
    }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
    }
}
