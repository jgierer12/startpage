FROM node:16

EXPOSE 3000

WORKDIR /app

COPY . .
COPY ./config.example.json /config/config.json

RUN npm install

CMD env NODE_ENV=production npm start
