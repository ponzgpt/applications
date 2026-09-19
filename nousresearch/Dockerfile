FROM nginx:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY es/index.html /usr/share/nginx/html/es/index.html
COPY zh/index.html /usr/share/nginx/html/zh/index.html
COPY javier-sketch.jpg /usr/share/nginx/html/javier-sketch.jpg
COPY javier-ponz-prado-cover-letter.pdf /usr/share/nginx/html/javier-ponz-prado-cover-letter.pdf
COPY llms.txt /usr/share/nginx/html/llms.txt
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
