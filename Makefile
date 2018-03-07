.PHONY: dev run build build-quiet redis clear

dev:
	make build-quiet && docker run -it --rm --env NODE_ENV=development --name dev --link price-redis:redis price-ticker

run:
	make build && docker run -it --rm --env NODE_ENV=production --name prod --link price-redis:redis price-ticker

build:
	docker build -t price-ticker -f docker/prod/Dockerfile .

build-quiet:
	docker build --quiet -t price-ticker -f docker/dev/Dockerfile .

redis:
	docker run -d -p 6379:6379 --rm --name price-redis redis:latest

clear:
	docker stop price-ticker || docker stop price-redis || docker rm price-ticker || docker rm price-redis
