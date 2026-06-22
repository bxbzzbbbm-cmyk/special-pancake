FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache wget && \
    wget -O server.js https://raw.githubusercontent.com/bxbzzbbbm-cmyk/special-pancake/refs/heads/main/server.js && \
    npm install express

ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
