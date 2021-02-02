FROM node:fermium-alpine3.10 AS builder
COPY . /src/nice-ui/
RUN cd /src/nice-ui/ && npm ci && npm run build

FROM nginx:mainline-alpine
COPY --from=builder /src/nice-ui/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
