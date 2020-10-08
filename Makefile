up: 
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

build-up:
	docker-compose up --build -d

nocache:
	docker-compose build --no-cache

ls:
	docker ps

stats:
	docker container stats

test:
	yarn jest

test-watch:
	yarn jest --watch