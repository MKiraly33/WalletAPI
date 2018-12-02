FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN ["npm", "install"]

EXPOSE 10010
CMD ["npm", "start"]