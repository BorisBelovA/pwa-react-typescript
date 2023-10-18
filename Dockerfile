FROM node:18.12.1

EXPOSE 3000

WORKDIR ./

COPY ./ ./
RUN npm install
RUN npm build

ENTRYPOINT ["npm", "run"]
