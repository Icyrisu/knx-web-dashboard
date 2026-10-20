FROM nodered/node-red:4.0.9
USER root
RUN npm install --unsafe-perm --no-update-notifier --no-fund --prefix /data node-red-contrib-modbus node-red-contrib-postgresql
USER node-red
COPY init.sql /data/init.sql
EXPOSE 1880
