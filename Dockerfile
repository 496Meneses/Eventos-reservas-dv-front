FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-del-proyecto /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
