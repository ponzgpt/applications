# Built from the repo root: docker build -f sites/nousresearch/Dockerfile .
FROM nginx:1.27-alpine
COPY snippets/ /etc/nginx/snippets/
COPY sites/nousresearch/nginx.conf /etc/nginx/conf.d/default.conf
COPY sites/nousresearch/index.html sites/nousresearch/llms.txt sites/nousresearch/robots.txt sites/nousresearch/sitemap.xml sites/nousresearch/javier-sketch.jpg sites/nousresearch/javier-ponz-prado-cover-letter.pdf /srv/site/
COPY sites/nousresearch/es/ /srv/site/es/
COPY sites/nousresearch/zh/ /srv/site/zh/
EXPOSE 80
