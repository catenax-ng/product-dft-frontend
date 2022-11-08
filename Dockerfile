# => Build container
FROM node:18.9.0-alpine3.15 as builder
WORKDIR /app
COPY ./package.json .
#RUN yarn
COPY ./ .
#RUN yarn build

RUN npm install && npm run build

#### Stage 2: Serve the application from Nginx 

#FROM ubuntu/nginx:latest 
FROM nginx:latest

# Nginx config
RUN rm -rf /etc/nginx/conf.d 

COPY ./conf /etc/nginx 

RUN chmod -R 777 /var/cache/nginx/ && chmod -R 777 /var/run

#RUN chmod -R 777 /var/lib/nginx && chmod -R 777 /var/log/nginx/

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

COPY ./env.sh .

USER nginx 

EXPOSE 80

# Start Nginx server
#CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

#EXPOSE 8080
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
