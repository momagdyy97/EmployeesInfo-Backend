pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO_BACKEND = 'https://github.com/momagdyy97/Essam-Zomool-Backend.git'
        GIT_REPO_FRONTEND = 'https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git'
        DOCKER_IMAGE_BACKEND = 'momousa1997/mern-backend'
        DOCKER_IMAGE_FRONTEND = 'momousa1997/mern-frontend'
        EC2_HOST = '3.29.24.171' // EC2 instance IP
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
                withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_USER')]) {
                    script {
                        sh '''
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} \
                        "ansible-playbook /var/www/html/deploy.yml -i /var/www/html/hosts.ini -u ${EC2_USER} -k -vvvv > ansible.log 2>&1"
                        cat ansible.log
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }
        failure {
            script {
                echo 'CI/CD Pipeline failed.'
                sh 'cat ansible.log'
            }
        }
    }
}
