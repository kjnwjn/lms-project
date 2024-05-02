# build stage
# FROM node:lts-alpine3.16 as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# 
# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE $PORT_CLIENT
# CMD ["nginx", "-g", "daemon off;"]

# ## STAGE 1: Build
FROM node:18-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV BUILD_ENV_FILE=.env.production
RUN npm run build

# ## STAGE 2: Production Environment
FROM nginx:mainline-alpine3.18-slim
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]