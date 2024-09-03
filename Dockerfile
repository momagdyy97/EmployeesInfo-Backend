FROM node:18
WORKDIR /backend-mern-app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 3001
CMD ["npm", "start"]
