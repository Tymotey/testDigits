#FROM alpine:3.17.2
FROM php:8.0.5
ENV NODE_PACKAGE_URL  https://unofficial-builds.nodejs.org/download/release/v18.16.0/node-v18.16.0-linux-x64-musl.tar.gz
ENV DOCKER_FILES_PATH  /usr/src/app

# install necessary libs and packages
RUN apk add libstdc++
WORKDIR /opt
RUN wget $NODE_PACKAGE_URL
RUN mkdir -p /opt/nodejs
RUN tar -zxvf *.tar.gz --directory /opt/nodejs --strip-components=1
RUN rm *.tar.gz
RUN ln -s /opt/nodejs/bin/node /usr/local/bin/node
RUN ln -s /opt/nodejs/bin/npm /usr/local/bin/npm
RUN npm install -g npm@9.6.6
RUN apk add g++ make py3-pip
RUN apk add --no-cache git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring
# RUN apk add --no-cache openssh


# Add ssh key
# RUN mkdir /root/.ssh && chmod -R 700 /root/.ssh
# RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# add our files
WORKDIR $DOCKER_FILES_PATH

# git clonning
RUN git clone https://github.com/Tymotey/testDigits $DOCKER_FILES_PATH

EXPOSE 5173
EXPOSE 8000

# Create .env file
RUN cp $DOCKER_FILES_PATH/.env.local $DOCKER_FILES_PATH/.env

# Install Laravel
RUN npm install
RUN composer install
RUN php artisan migrate:fresh --seed
RUN php artisan passport:install --force
RUN php artisan passport:keys --force
# Install Frontend
RUN cd _frontend
RUN npm install


# RUN npm
CMD [ "npm", "startDocker" ]