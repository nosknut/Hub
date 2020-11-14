FROM node:12

WORKDIR /app

COPY package*.json ./

COPY client/package*.json ./client/

RUN npm install

RUN npm run install-client

COPY . .

RUN npm run build-client

ENV PORT=80

EXPOSE 80

CMD [ "npm", "start" ]
