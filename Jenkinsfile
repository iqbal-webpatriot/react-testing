pipeline {
  agent any
    tools {
        nodejs 'nodejs-24'
    }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint & Format Check') {
      steps {
        sh 'npm run lint'
        sh 'npm run format'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm run test -- --watchAll=false'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    failure {
      echo '🚨 Pipeline failed! Please check the logs.'
    }
    success {
      echo '✅ Pipeline completed successfully!'
    }
  }
}
