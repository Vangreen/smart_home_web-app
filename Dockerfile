#################
# Build the app #
#################
FROM node:12-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli@11.1.4
RUN ng build --prod --output-path=dist

################
# Run in NGINX #
################
FROM nginx
COPY /dist /usr/share/nginx/html
COPY /src/assets /usr/share/nginx/html/assets
EXPOSE 80
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
