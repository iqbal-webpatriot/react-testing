pipeline {
  agent none

  environment {
    CI = 'true'
    IMAGE_NAME = 'localhost:5000/react-testing'
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Checkout') {
      agent any
      steps {
        checkout scm
      }
    }

    stage('Install, Test & Build') {
      agent {
        docker {
          image 'node:18-alpine'
          reuseNode true
        }
      }
      steps {
        // Install ALL dependencies (including devDependencies)
        sh 'echo "📦 Installing all dependencies..."'
        sh 'npm install'
        
        // Run quality checks
        sh 'echo "🧹 Running lint..."'
        sh 'npm run lint'
        
        sh 'echo "🧪 Running tests..."'
        sh 'npm run test -- --watchAll=false --ci'
        
        // Build production assets (will be rebuilt in Docker)
        sh 'echo "🏗️ Building production bundle..."'
        sh 'npm run build'
      }
    }

    stage('Build Production Image') {
      agent any
      steps {
        script {
          // Verify critical files exist
          if (!fileExists('Dockerfile')) {
            error '❌ Dockerfile not found in project root!'
          }

          // Get git commit SHA for immutable tagging
          def gitCommit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          
          echo "🐳 Building optimized Docker image..."
          docker.build(
            "${IMAGE_NAME}:${gitCommit}",
            "--build-arg NODE_ENV=production ."
          )
          
          // Verify production image doesn't contain dev dependencies
          echo "🔍 Verifying production image..."
          def imageId = docker.image("${IMAGE_NAME}:${gitCommit}").id
          sh """
            if docker run --rm ${imageId} npm list | grep -q 'devDependencies'; then
              echo "ERROR: Dev dependencies found in production image!"
              exit 1
            fi
          """
          
          echo "📤 Pushing to registry..."
          docker.withRegistry('http://localhost:5000') {
            docker.image("${IMAGE_NAME}:${gitCommit}").push()
          }
        }
      }
    }
  }

  post {
    always {
      echo "🧹 Cleanup completed"
    }
    success {
      script {
        def gitCommit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        echo "✅ Success! Production image pushed as:"
        echo "${IMAGE_NAME}:${gitCommit}"
      }
    }
    failure {
      echo "🚨 Pipeline failed! Check logs for details."
    }
  }
}