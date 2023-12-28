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

# API endpoints

## User

| Method      | Link                | Info                                            | Data to send                                                                                                           |
| ----------- | ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| POST        | api/login           | User login request.                             |                                                                                                                        |
| GET or HEAD | api/logout          | User logout request.                            |                                                                                                                        |
| GET or HEAD | api/profile         | Return logged in user data.                     |                                                                                                                        |
| GET         | api/v1/users        | Users list, paginated                           |                                                                                                                        |
| GET         | api/v1/users/{user} | Get user data by id                             |                                                                                                                        |
| PUT         | api/v1/users/{user} | Any of values. Update user by id with data sent | **name, email, role**. If **password** and **passwordConfirm** are present and the same, user password will be changed |
| DELETE      | api/v1/users/{user} | Delete user by id                               |                                                                                                                        |

## Projects

| Method | Link                      | Info                                | Data to send                                                           |
| ------ | ------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| GET    | api/v1/projects           | Projects list, paginated            |                                                                        |
| POST   | api/v1/projects           | Add new project                     | **assignedTo, title, description, visible, status**                    |
| GET    | api/v1/projects/{project} | Get project data by id              |                                                                        |
| PUT    | api/v1/projects/{project} | Update project by id with data sent | Any of the values: **assignedTo, title, description, visible, status** |
| DELETE | api/v1/projects/{project} | Delete project by id                |                                                                        |

## Tasks

| Method | Link                | Info                             | Data to send                                                                          |
| ------ | ------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| GET    | api/v1/tasks        | Tasks list, paginated            |                                                                                       |
| POST   | api/v1/tasks        | Add new task                     | **assignedTo, projectId, title, content, visible, status, sortBy**                    |
| GET    | api/v1/tasks/{task} | Get project data by id           |                                                                                       |
| PUT    | api/v1/tasks/{task} | Update task by id with data sent | Any of the values: **assignedTo, projectId, title, content, visible, status, sortBy** |
| DELETE | api/v1/tasks/{task} | Delete task by id                |                                                                                       |

## List parameters
