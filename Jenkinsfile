pipeline {
  agent { label 'docker-agent-alpine' }

  stages {
    stage('📦 Install All Dependencies') {
      steps {
        script {
          docker.image('node:18-alpine').inside('-v $HOME/.npm:/root/.npm') {
            sh 'npm ci'
          }
        }
      }
    }

    stage('🧹 Code Quality Checks') {
      steps {
        script {
          docker.image('node:18-alpine').inside('-v $HOME/.npm:/root/.npm') {
            sh 'npm run lint'
          }
        }
      }
    }

    stage('🧪 Run Tests') {
      steps {
        script {
          docker.image('node:18-alpine').inside('-v $HOME/.npm:/root/.npm') {
            sh 'npm run test'
          }
        }
      }
    }

    stage('🧼 Clean & Prepare for Production') {
      steps {
        script {
          docker.image('node:18-alpine').inside('-v $HOME/.npm:/root/.npm') {
            sh 'rm -rf node_modules'
            sh 'npm ci --omit=dev'
          }
        }
      }
    }

    stage('⚙️ Build Production Files') {
      steps {
        script {
          docker.image('node:18-alpine').inside('-v $HOME/.npm:/root/.npm') {
            sh 'npm run build'
          }
        }
      }
    }
  }
}
