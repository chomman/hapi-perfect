FROM node:latest

LABEL maintainer="leonard.cherouvrier@icloud.com"

WORKDIR /usr/app/

RUN rm -rf ./node_modules
RUN node --version

ADD ./src .
ADD ./logs .
ADD ./data .

ADD ./package.json .
ADD ./yarn.lock .
ADD ./tsconfig.json .

EXPOSE 8080