pipeline {
  agent any

  stages {
    stage('📦 Install All Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('🧹 Code Quality Checks') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('🧪 Run Tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('🧼 Clean & Prepare for Production') {
      steps {
        sh 'rm -rf node_modules'
        sh 'npm ci --omit=dev'
      }
    }

    stage('⚙️ Build Production Files') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
