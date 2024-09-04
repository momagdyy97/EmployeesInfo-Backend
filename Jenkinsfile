pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO_BACKEND = 'https://github.com/momagdyy97/Essam-Zomool-Backend.git'
        GIT_REPO_FRONTEND = 'https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git'
        DOCKER_IMAGE_BACKEND = 'momousa1997/mern-backend'
        DOCKER_IMAGE_FRONTEND = 'momousa1997/mern-frontend'
        EC2_SSH_CREDENTIALS = credentials('ansible-ssh-key') // Jenkins credentials for SSH access to EC2
        EC2_USER = 'ubuntu' // Username for SSH access
        EC2_HOST = '3.29.24.171' // EC2 instance IP
        SSHPASS = credentials('6d035460-0417-4c69-9cab-c283b403ba78') // Updated with the credential ID
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
                script {
                    // Use SSH to run the Ansible playbook on EC2 instance with verbose output
                    sh """
                    sshpass -e ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} 'ansible-playbook /var/www/html/deploy.yml -i /var/www/html/hosts.ini -u ${EC2_USER} -k -vvv'
                    """
                }
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
