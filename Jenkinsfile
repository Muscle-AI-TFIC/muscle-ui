pipeline {
  agent {
    docker {
      image 'node:20'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
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
}