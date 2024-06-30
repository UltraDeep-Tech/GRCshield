# Usa una imagen base apropiada para tu proyecto
FROM nginx:alpine

# Copia los archivos de tu proyecto al directorio de trabajo del contenedor
COPY . /usr/share/nginx/html

# Expon el puerto 80
EXPOSE 80
