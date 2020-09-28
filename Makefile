up: 
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

nocache:
	docker-compose build --no-cache

ls:
	docker ps

stats:
	docker container stats