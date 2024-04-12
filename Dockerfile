# Use a imagem oficial do Node.js como base
FROM node:20.12.2

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Instale o Nodemon globalmente
RUN npm install -g nodemon

# Porta que a aplicação Node.js irá escutar
EXPOSE 3000

# Comando para iniciar a aplicação com Nodemon
CMD ["nodemon", "start"]
