pipeline {
  agent none

  environment {
    CI = 'true'
    IMAGE_NAME = 'localhost:5000/react-testing'
    DOCKER_BUILD_ARGS = '--pull --no-cache' // Ensures clean builds
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
          args "-v ${env.HOME}/.npm:/root/.npm -v ${env.WORKSPACE}:${env.WORKSPACE}"
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

          sh 'echo � Building app...'
          sh 'npm run build'
        }
      }
    }

    stage('Build Production Image') {
      agent any
      when {
        expression { 
          // Only build if tests passed (implied by reaching this stage)
          return true 
        }
      }
      steps {
        script {
          // Verify Dockerfile exists
          def dockerfile = fileExists 'Dockerfile'
          if (!dockerfile) {
            error '❌ Dockerfile not found in project root!'
          }

          echo "🐳 Building production image using project Dockerfile..."
          
          // Build with custom tags including git commit hash
          def gitCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          def buildDate = sh(returnStdout: true, script: 'date +%Y%m%d-%H%M').trim()
          
          docker.build("${IMAGE_NAME}:${gitCommit}", 
                      "--build-arg BUILD_DATE=${buildDate} " +
                      "--build-arg VCS_REF=${gitCommit} " +
                      "${env.DOCKER_BUILD_ARGS} .")
          
          // Tag as latest
          docker.image("${IMAGE_NAME}:${gitCommit}").inside {
            sh "docker tag ${IMAGE_NAME}:${gitCommit} ${IMAGE_NAME}:latest"
          }

          echo "📤 Pushing Docker image to local registry..."
          docker.withRegistry('http://localhost:5000') {
            docker.image("${IMAGE_NAME}:${gitCommit}").push()
            docker.image("${IMAGE_NAME}:latest").push()
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
      echo "Image tags: ${IMAGE_NAME}:<git-commit> and ${IMAGE_NAME}:latest"
    }
  }
}