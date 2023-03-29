FROM node:18.14.0

WORKDIR /app

ADD . .


RUN npm install

EXPOSE 5137

CMD ["npm", "run", "dev"]
