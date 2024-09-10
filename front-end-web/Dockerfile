# Use a imagem oficial do Node.js como base
FROM node:18 AS build

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos da aplicação
COPY . .

# Construa a aplicação
RUN yarn build

# Use uma imagem leve do Nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos da build para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]