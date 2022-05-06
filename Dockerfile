FROM node:16.15-buster

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install webpack

COPY . .

COPY ./src ./src
COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]