pipeline {
    agent any
    environment {
        BACKEND_REPO = 'https://github.com/momagdyy97/Essam-Zomool-Backend.git'
        FRONTEND_REPO = 'https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git'
    }
    stages {
        stage('Checkout Backend') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: env.BACKEND_REPO]]
                ])
            }
        }
        stage('Checkout Frontend') {
            steps {
                dir('frontend') { // Create a subdirectory for the frontend repo
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[url: env.FRONTEND_REPO]]
                    ])
                }
            }
        }
        stage('Build Backend') {
            steps {
                // Add your backend build commands here, e.g.:
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') { 
                    // Add your frontend build commands here, e.g.:
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Add deployment steps here for both backend and frontend
                echo 'Deploying Backend and Frontend...'
            }
        }
    }
}
