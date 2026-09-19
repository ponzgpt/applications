FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY snippets/ /etc/nginx/snippets/
COPY nousresearch/index.html nousresearch/llms.txt nousresearch/robots.txt nousresearch/sitemap.xml nousresearch/javier-sketch.jpg nousresearch/javier-ponz-prado-cover-letter.pdf /srv/nousresearch/
COPY nousresearch/es/ /srv/nousresearch/es/
COPY nousresearch/zh/ /srv/nousresearch/zh/
COPY 37signals/index.html 37signals/robots.txt /srv/37signals/
EXPOSE 80
