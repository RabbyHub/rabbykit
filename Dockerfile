FROM node:18-buster

WORKDIR /app

COPY site/doc/package.json /app

RUN yarn install

COPY site/doc/ /app

RUN yarn build

ENTRYPOINT [ "yarn" ]

CMD [ "start", "-H", "0.0.0.0", "-p", "3000" ]
