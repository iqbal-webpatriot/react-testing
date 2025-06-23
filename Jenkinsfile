pipeline {
  agent none

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

    stage('Install & Test') {
      agent {
        docker {
          image 'node:18-alpine'
          args "-v $HOME/.npm:/root/.npm -v ${env.WORKSPACE}:${env.WORKSPACE}"
          reuseNode true
        }
      }
      steps {
        dir("${env.WORKSPACE}") {
          sh 'echo 📦 Installing dependencies...'
          sh 'npm ci'

          sh 'echo 🧪 Running lint...'
          sh 'npm run lint || true'

          sh 'echo ✨ Checking formatting...'
          sh 'npm run format || true'

          sh 'echo 🧪 Running tests...'
          sh 'npm run test -- --watchAll=false'

          sh 'echo 🏗️ Building app...'
          sh 'npm run build'
        }
      }
    }

    stage('Build & Push Docker Image') {
      agent any
      steps {
        script {
          echo "🐳 Building Docker image: ${IMAGE_NAME}"
          docker.build("${IMAGE_NAME}", ".")

          echo "📤 Pushing Docker image to local registry..."
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
      echo '✅ Docker image built and pushed to local registry!'
    }
  }
}
