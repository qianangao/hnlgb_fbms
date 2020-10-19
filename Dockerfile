FROM 192.168.30.140:30002/devops/nginx:v16.0
COPY /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]