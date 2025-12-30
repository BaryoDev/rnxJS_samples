# Use nginx to serve static files
FROM nginx:alpine

# Copy all HTML files and assets
COPY *.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY LICENSE /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Copy Django demo
COPY django-demo /usr/share/nginx/html/django-demo

# Copy Express demo  
COPY express-demo /usr/share/nginx/html/express-demo

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
