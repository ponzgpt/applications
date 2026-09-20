# Built from the repo root: docker build -f sites/omarchy/Dockerfile .
FROM nginx:1.27-alpine
COPY snippets/ /etc/nginx/snippets/
COPY sites/omarchy/nginx.conf /etc/nginx/conf.d/default.conf
COPY sites/omarchy/index.html sites/omarchy/robots.txt /srv/site/
EXPOSE 80
