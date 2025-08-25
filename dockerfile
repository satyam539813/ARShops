FROM node:18

WORKDIR /ar-webstore/

COPY public/ /ar-webstore/public
COPY src/ /ar-webstore/src
COPY package.json /ar-webstore/

RUN npm install --legacy-peer-deps

CMD ["npm", "start"]

EXPOSE 3000