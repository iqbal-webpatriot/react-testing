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

    stage('Lint & Test') {
      agent {
        docker {
          image 'node:18-alpine'
          reuseNode true
        }
      }
      steps {
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
          def gitCommit = sh(
            script: 'git rev-parse --short HEAD', 
            returnStdout: true
          ).trim()
          
          echo "🐳 Building Docker image (including production build)..."
          docker.build(
            "${IMAGE_NAME}:${gitCommit}",
            "--build-arg NODE_ENV=production ."
          )

          // Additional quality checks can be added here
          echo "🔍 Verifying image contents..."
          def imageId = docker.image("${IMAGE_NAME}:${gitCommit}").id
          sh "docker run --rm ${imageId} ls -l /usr/share/nginx/html"
          
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
        def gitCommit = sh(
          script: 'git rev-parse --short HEAD', 
          returnStdout: true
        ).trim()
        echo "✅ Success! Production image pushed as:"
        echo "${IMAGE_NAME}:${gitCommit}"
      }
    }
    failure {
      echo "🚨 Pipeline failed! Check logs for details."
    }
  }
}