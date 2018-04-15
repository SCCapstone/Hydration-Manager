FROM launcher.gcr.io/google/nodejs
RUN install_node v8.4.0
COPY . /Hydration-Manager/
RUN (cd programs/server && npm install --unsafe-perm)
CMD node main.js