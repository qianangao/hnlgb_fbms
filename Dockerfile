FROM 192.168.30.140:30002/devops/nginx:v16.0
COPY /dist /usr/share/nginx/html/hnlgb/hnlgb-fbms
COPY nginx.conf /etc/nginx/
RUN cnpm install -g increase-memory-limit
CMD ["nginx", "-g", "daemon off;"]