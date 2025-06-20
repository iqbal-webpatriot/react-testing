pipeline {
  agent none // No global agent

  environment {
    CI = 'true'
    IMAGE_NAME = 'localhost:5000/react-testing'
  }

  stages {
    stage('Checkout') {
      agent any
      steps {
        checkout scm
      }
    }

    stage('Node Operations') {
      agent {
        docker {
          image 'node:18-alpine'
          args '-v $HOME/.npm:/root/.npm -v $WORKSPACE:/app'
          reuseNode true // Runs on same worker where Jenkins is running
        }
      }
      steps {
        dir('/app') {
          sh 'npm ci'
          sh 'npm run lint'
          sh 'npm run format'
          sh 'npm run test -- --watchAll=false'
          sh 'npm run build'
        }
      }
    }

    stage('Build & Push Docker Image') {
      agent any // Uses the main Jenkins agent with Docker access
      steps {
        script {
          // Build using the host's Docker
          docker.build("${IMAGE_NAME}")
          
          // Push to local registry
          docker.withRegistry('http://localhost:5000') {
            docker.image("${IMAGE_NAME}").push()
          }
        }
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