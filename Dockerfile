FROM node:18.12.1 as bundle

RUN mkdir /bundle
WORKDIR /bundle

COPY ./ ./

RUN npm install --legacy-peer-deps
# RUN npm audit fix --force || true
RUN npm run build


FROM nginx

COPY --from=bundle /bundle /usr/share/nginx/roommate

RUN echo '\
server { \n\
    listen       80; \n\
    server_name  localhost; \n\
    location / { \n\
        root   /usr/share/nginx/roommate/build; \n\
        index  index.html index.htm; \n\
    } \n\
} \n\
' > /etc/nginx/conf.d/default.conf

#ENTRYPOINT ["npm", "start"]
CMD ["nginx", "-g", "daemon off;"]

