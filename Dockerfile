# base image
FROM nginx

# copy artifact build from the 'build environment'
COPY /dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
