pipeline {
    agent { label 'Muscle-Agent' }

    stages {
        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker image...'
                sh 'sudo docker build -t muscle-ui-app .'
            }
        }
        stage('List Docker Images') {
            steps {
                echo 'Listing Docker images'
                sh 'sudo docker images'
            }
        }
    }
}
