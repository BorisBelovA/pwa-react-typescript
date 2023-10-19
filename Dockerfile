FROM node:18.12.1

EXPOSE 3000

WORKDIR ./

COPY ./ ./
RUN apt update && apt -y install vim
RUN npm install --legacy-peer-deps
RUN npm audit fix --force || true
RUN npm run build

ENTRYPOINT ["npm", "start"]
