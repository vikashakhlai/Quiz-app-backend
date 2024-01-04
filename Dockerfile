FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "dev"]