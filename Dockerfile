FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm install

EXPOSE ${PORT}


