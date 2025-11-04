pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        sh 'npm install && npm run build'
      }
    }
    stage('Run Tests') {
        steps {
            echo 'Running tests...'
            sh 'npm test'
        }
    }
  }
}
