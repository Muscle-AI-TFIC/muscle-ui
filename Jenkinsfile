pipeline {
  agent any

  tools {
    nodejs 'node'
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
  }
}
