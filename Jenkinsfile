pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO_BACKEND = 'https://github.com/momagdyy97/EmployeesInfo-Backend.git'
        GIT_REPO_FRONTEND = 'https://github.com/momagdyy97/EmployeesInfo-Frontend.git'
        DOCKER_IMAGE_BACKEND = 'momousa1997/mern-backend'
        DOCKER_IMAGE_FRONTEND = 'momousa1997/mern-frontend'
        EC2_HOST = '3.29.209.189' // EC2 instance IP
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
                        "ansible-playbook /var/www/html/deploy.yml -i /var/www/html/hosts.ini -u ${EC2_USER} -k -vvvv > ansible.log 2>&1; \
                        if [ -f ansible.log ]; then \
                            tail -n 50 ansible.log; \
                        else \
                            echo 'ansible.log file not found.'; \
                        fi"
                        '''
                    }
                }
            }
        }

        stage('Stop and Remove Docker Containers') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_USER')]) {
                    script {
                        sh '''
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} \
                        "docker ps -q | xargs -r docker stop && docker ps -aq | xargs -r docker rm"
                        '''
                    }
                }
            }
        }

        stage('Start Docker Containers') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_USER')]) {
                    script {
                        sh '''
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} \
                        "cd /var/www/html && docker-compose up -d > docker-compose.log 2>&1; \
                        if [ -f docker-compose.log ]; then \
                            tail -n 50 docker-compose.log; \
                        else \
                            echo 'docker-compose.log file not found.'; \
                        fi"
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
                sh '''
                if [ -f ansible.log ]; then
                    echo "Ansible log:";
                    tail -n 50 ansible.log;
                else
                    echo "ansible.log file not found.";
                fi
                if [ -f docker-compose.log ]; then
                    echo "Docker Compose log:";
                    tail -n 50 docker-compose.log;
                else
                    echo "docker-compose.log file not found.";
                fi
                '''
            }
        }
    } 
}
