# Build

FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production

FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY --from=0 /app/public ./public
COPY --from=0 /app/.next ./.next

RUN npm install --production

EXPOSE 3000

CMD npm start
