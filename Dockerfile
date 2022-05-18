FROM node:16-slim

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

COPY ./config.example.json /config/config.json
COPY . .

EXPOSE 3000
CMD ["node", "app.mjs"]
