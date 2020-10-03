# base nginx image
FROM node:12

# an arbitrary directory to build our site in
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

# copy the project into the container
COPY . .

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

EXPOSE 5000

CMD ["npm", "start"]