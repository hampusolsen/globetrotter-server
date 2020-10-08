FROM redis:6.0.8-alpine

COPY redis.conf /usr/local/etc/redis/redis.conf
COPY init.sh .

EXPOSE 6379

RUN chmod -v +x init.sh

CMD ["sh", "-c", "./init.sh"]