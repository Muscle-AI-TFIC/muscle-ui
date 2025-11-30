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

        // Estágio para executar os testes com cobertura
        stage('Test') {
            steps {
                sh 'npm test:coverage'
            }
            post {
                always {
                    // Salva o relatório de cobertura
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: false
                }
            }
        }

        // Estágio para executar verificador de segurança do node
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
