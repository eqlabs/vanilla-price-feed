.PHONY: dev build clear

dev:
	make build-quiet && docker run -it --rm --name dev --link price-redis:redis price-ticker

build:
	docker build -t price-ticker .

build-quiet:
	docker build --quiet -t price-ticker . 

redis:
	docker run -d -p 6379:6379 --rm --name price-redis redis:latest

clear:
	docker stop price-ticker || docker stop price-redis || docker rm price-ticker || docker rm price-redis
