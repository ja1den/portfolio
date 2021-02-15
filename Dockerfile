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

COPY --from=0 /app/build ./build

RUN npm install serve -g

EXPOSE 3000

CMD serve -s -n -l 3000 build
