FROM node:20.17.0-alpine

WORKDIR /contact-manager

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn build

EXPOSE 8090

CMD ["yarn", "start"]