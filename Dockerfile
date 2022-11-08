# => Build container
FROM node:18.9.0-alpine3.15 as builder
WORKDIR /app
COPY ./package.json .
#RUN yarn
COPY ./ .
#RUN yarn build
RUN npm install && npm run build

#FROM nginx:1.22.0-alpine
#FROM nginxinc/nginx-unprivileged:latest
FROM nginx:latest
#FROM nginxinc/nginx-unprivileged:1.23-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d

COPY ./conf /etc/nginx
# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
#EXPOSE 8080
EXPOSE 80
#EXPOSE 443


#ARG UID=7000
#ARG GID=7000

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

#RUN apk add --no-cache bash
#RUN apt-get update -y && apt-get install -y nocache
# Add bash
#RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod 777 env.sh
RUN chmod 777 -R /usr/share/nginx/html/*

#RUN chown ${UID}:${GID} /usr/share/nginx/html
#USER ${UID}:${GID}

# Start Nginx server
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
#CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
