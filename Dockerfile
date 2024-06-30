# Usa una imagen base apropiada para tu proyecto
FROM nginx:alpine

# Copia los archivos de tu proyecto al directorio de trabajo del contenedor
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Cambiar el puerto de NGINX a 8080 para Cloud Run
RUN sed -i 's/80/8080/' /etc/nginx/conf.d/default.conf

# Comando de inicio de NGINX
CMD ["nginx", "-g", "daemon off;"]
