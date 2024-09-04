pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO_BACKEND = 'https://github.com/momagdyy97/Essam-Zomool-Backend.git'
        GIT_REPO_FRONTEND = 'https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git'
        DOCKER_IMAGE_BACKEND = 'momousa1997/mern-backend'
        DOCKER_IMAGE_FRONTEND = 'momousa1997/mern-frontend'
    }

    stages {
        stage('Clone Repositories') {
            steps {
                dir('backend') {
                    git branch: 'main', url: "${env.GIT_REPO_BACKEND}"
                }
                dir('frontend') {
                    git branch: 'main', url: "${env.GIT_REPO_FRONTEND}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}", './backend')
                    docker.build("${DOCKER_IMAGE_FRONTEND}", './frontend')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:latest").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:latest").push()
                    }
                }
            }
        }

        stage('Deploy Using Ansible') {
            steps {
                ansiblePlaybook(
                    playbook: 'deploy.yml',
                    inventory: 'hosts.ini',
                    credentialsId: 'ansible-ssh-key'
                )
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }
        failure {
            echo 'CI/CD Pipeline failed.'
        }
    }
}
