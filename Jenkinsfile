pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                sh 'docker build -t muscle-ui-app .'
            }
        }
        stage('List Docker Images') {
            steps {
                echo 'Listing Docker images...'
                sh 'docker images'
            }
        }
    }
}