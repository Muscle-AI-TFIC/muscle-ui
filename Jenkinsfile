pipeline {
    agent { label 'Muscle-Agent' }

    stages {
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                sh 'docker build -t muscle-ui-app .'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}
