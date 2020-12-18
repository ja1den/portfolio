# Build

FROM node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

# Production

FROM node:alpine

WORKDIR /app

COPY package*.json /app

COPY --from=0 /app/.next /app/.next

RUN npm install --production

EXPOSE 3000

CMD npm start
