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
     stage('Deploying App to Docker Container') {
      agent any
      steps {
        script {
          def gitCommit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()

          echo "🛑 Stopping old container (if any)..."
          sh """
            if docker ps -q --filter "name=react-testing" | grep -q .; then
              docker stop react-testing
              docker rm react-testing
            fi
          """

          echo "📦 Deploying new container..."
          sh """
            docker run -d \
              --name react-testing \
              -p 3000:3000 \
              ${IMAGE_NAME}:${gitCommit}
          """
        }
      }
    }

  }

  post {
    always {
      echo "🧹 Cleanup completed"
    }
    success {
        echo "✅ Success! Production image built and pushed successfully."
    }
    failure {
      echo "🚨 Pipeline failed! Check logs for details."
    }
  }
}