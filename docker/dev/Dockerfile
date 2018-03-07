FROM tislaamo/node:8

ADD package.json .
ADD yarn.lock .

RUN yarn install

ADD . /home/node/app

CMD ["node", "src/index.js"]
