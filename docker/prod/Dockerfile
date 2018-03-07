FROM tislaamo/node:8

ADD package.json .
ADD yarn.lock .

RUN yarn install
RUN yarn build

ADD ./vanilla-price-feed /home/node/app

CMD ["./vanilla-price-feed"]
