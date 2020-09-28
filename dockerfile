# base nginx image
FROM nginx:alpine

# an arbitrary directory to build our site in
WORKDIR /build

# copy the project into the container
COPY . .

# install npm
RUN apk add --update npm

RUN npm i

RUN npm generate


# build the project and copy the result to the nginx folder

RUN cp -fR /dist/* /usr/share/nginx/html