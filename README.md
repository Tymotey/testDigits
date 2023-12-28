# Install:

## Server

Create database named: **11test** OR if you want different name, change in .env, parameter **DB_DATABASE**

```
npm install
composer install
php artisan migrate:reset
php artisan migrate:fresh --seed

php artisan passport:install --force
php artisan passport:keys --force
```

## Frontend

```
cd \_frontend
npm install
```

# Start test:

```
npn run dev
cd \_frontend
php artisan serve
```
