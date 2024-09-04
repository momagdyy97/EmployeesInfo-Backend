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
        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'docker build -t momousa1997/mern-backend:latest .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t momousa1997/mern-frontend:latest .'
                    }
                }
            }
        }
        stage('Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                        sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                        sh 'docker push momousa1997/mern-backend:latest'
                        sh 'docker push momousa1997/mern-frontend:latest'
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Stop and remove any existing containers
                    sh 'cd /var/www/html && docker-compose down || true'
                    
                    // Start the services using Docker Compose
                    sh 'cd /var/www/html && docker-compose up -d'
                }
            }
        }
    }
    post {
        always {
            // Cleanup any dangling images to save space
            sh 'docker image prune -f'
            sh 'docker logout'
        }
    }
}
