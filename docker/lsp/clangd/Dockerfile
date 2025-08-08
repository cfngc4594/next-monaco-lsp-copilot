FROM node:18-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

RUN git clone https://github.com/wylieconlon/jsonrpc-ws-proxy.git .

RUN npm install && npm run prepare && npm prune --production

FROM node:18-alpine

RUN apk add --no-cache build-base clang-extra-tools

WORKDIR /app

COPY servers.yml .

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js", "--port", "3000", "--languageServers", "servers.yml"]
