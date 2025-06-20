pipeline {
  agent {
    docker {
      image 'node:18-alpine'
      args '-v $HOME/.npm:/root/.npm'
    }
  }

  environment {
    CI = 'true'
    IMAGE_NAME = 'localhost:5000/react-testing'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
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

    stage('Build Docker Image') {
      agent any  // Run Docker build on the host (not inside node container)
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Push to Local Registry') {
      agent any
      steps {
        sh 'docker push $IMAGE_NAME'
      }
    }
  }

  post {
    failure {
      echo '🚨 Pipeline failed! Please check the logs.'
    }
    success {
      echo '✅ Image built and pushed to local registry!'
    }
  }
}
