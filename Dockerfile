FROM node:16.13.0-alpine 

RUN mkdir /my_app

COPY . /my_app

COPY package.json /my_app

WORKDIR /my_app

RUN npm install

EXPOSE 3000

CMD node src/index.js