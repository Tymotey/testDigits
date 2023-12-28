# Docker:

```
docker build -t 11digits/test .
docker push 11digits/test
docker run -it -p 5173:5173 -p 8000:8000 --rm --name test 11digits/test
```

# Install:

## Server

Create database named: **11test** OR if you want different name, change in .env, parameter **DB_DATABASE**
Change database user and password if needed

rename **.env.local** to **.env**

```
npm install
composer install
php artisan migrate:fresh --seed

php artisan passport:install --force
php artisan passport:keys --force
```

## Frontend

```
cd _frontend
npm install
```

# Start server and frontend:

```
php artisan serve
cd _frontend
npm run dev
```

# Test data:

[Test link - http://127.0.0.1:5173/](http://127.0.0.1:5173/)

Available users

```
password: asd

bondastimotei-admin@gmail.com - admin type
bondastimotei-user@gmail.com - user type
```

Extra commands:

```
php artisan migrate:reset
```
