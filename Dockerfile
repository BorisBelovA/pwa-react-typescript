FROM node:18.12.1 as bundle

RUN mkdir /bundle
WORKDIR /bundle

COPY ./ ./

RUN npm install --legacy-peer-deps
# RUN npm audit fix --force || true
RUN npm run build


FROM nginx

COPY --from=bundle /bundle /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN mv ./public/* ./

#ENTRYPOINT ["npm", "start"]
CMD ["nginx", "-g", "daemon off;"]

