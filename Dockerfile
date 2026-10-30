FROM node:22-alpine
WORKDIR /app
COPY . .
RUN node build.mjs
ENV HOST=0.0.0.0
EXPOSE 8080
CMD ["node", "server.mjs"]
