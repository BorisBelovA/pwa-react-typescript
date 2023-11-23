FROM node:18.12.1 as bundle

RUN mkdir /bundle
WORKDIR /bundle

COPY ../.. ./

RUN npm install --legacy-peer-deps
# RUN npm audit fix --force || true
RUN npm run build:dev


FROM nginx

COPY --from=bundle /bundle/build /usr/share/nginx/roommate

RUN echo '\
server { \n\
    listen       80; \n\
    server_name  localhost; \n\
    location / { \n\
        root   /usr/share/nginx/roommate; \n\
        index  index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
} \n\
' > /etc/nginx/conf.d/default.conf

#ENTRYPOINT ["npm", "start"]
CMD ["nginx", "-g", "daemon off;"]

