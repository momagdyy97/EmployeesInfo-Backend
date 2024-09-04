pipeline {
    agent any
    environment {
        BACKEND_REPO = 'https://github.com/momagdyy97/Essam-Zomool-Backend.git'
        FRONTEND_REPO = 'https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
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
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKERHUB_CREDENTIALS) {
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
                    sh 'docker-compose down || true'
                    
                    // Start the services using Docker Compose
                    sh 'docker-compose up -d'
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
