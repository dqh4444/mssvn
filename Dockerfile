# Bước 1: Build ứng dụng React
FROM node:16 AS build

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

# Bước 2: Cài đặt Nginx và cấu hình
FROM nginx:1.25.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
