FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run start:dev
