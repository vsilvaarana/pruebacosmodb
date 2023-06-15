#FROM node:alpine3.11
FROM node
WORKDIR /nodejs_api
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENV MONGO_URL mongodb://cosmodb-vs202306:xCk70Ll9bQz4ddP7lF1J4USt3d3hXetUOY2lFL94Eg8VbPheastrd6n2t9T5okuLlMNv9cgRBVjpACDbcG7kyg==@cosmodb-vs202306.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmodb-vs202306@
EXPOSE 3001 
CMD ["npm","start"]