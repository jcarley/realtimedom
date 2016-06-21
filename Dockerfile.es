FROM elasticsearch:2.3.3

RUN /usr/share/elasticsearch/bin/plugin install -b lmenezes/elasticsearch-kopf/2.0
RUN /usr/share/elasticsearch/bin/plugin install --verbose -b river-rethinkdb http://goo.gl/JmMwTf

EXPOSE 9200 9300
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["elasticsearch"]

