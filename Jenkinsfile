pipeline {
  agent any
  stages {
    stage('Build & Test') {
      steps {
        sh 'docker run --rm -v "$WORKSPACE:/app" -w /app node:20 /bin/sh -c "npm install && npm test"'
      }
    }
  }
}
