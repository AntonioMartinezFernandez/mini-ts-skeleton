# mini-ts-skeleton

## _Minimalist Express / Typescript API boilerplate for katas and small RESTful APIs_

### Technologies

- Express web framework
- Unit testing with Jest
- MongoDB database with Mongoose
- Typescript

### Features

- HTTP Requests Security (Helmet, CORS, HTTP Parameter Pollution)
- Compressed HTTP Responses (Compression)
- Routes Autoloading
- Morgan Logger & Beautiful console messages
- Configurable environment variables
- Exceptions handler
- Basic User Auth implemented

### Endpoints

- **GET /api/v1** - _Return server status_
- **GET /api/v1/user/all** - _Return all users_
- **GET /api/v1/user/find/:id** - _Return user with id equal to :id_
- **POST /api/v1/user/save** - _Save user_
- **PUT /api/v1/user/edit/:id** - _Edit user with id equal to :id_
- **DELETE /api/v1/user/delete/:id** - _Delete user with id equal to :id_
- **POST /api/v1/auth/signup** - _Register a new user_
- **POST /api/v1/auth/login** - _Login user and return JWT token_
- **GET /api/v1/protected** - _Accesible only for logged users -sending Bearer Token in the HTTP request-_

### Development deploy

1. Install git
2. Install NodeJS and NPM
3. Install MongoDB
4. Open a terminal and run:

```
# git clone https://github.com/AntonioMartinezFernandez/mini-ts-skeleton
# cd mini-ts-skeleton
# npm install
```

5. Edit the _.env.development.local_ file with configuration parameters
6. Open the terminal and run:

```
# npm run dev
```

### Build for production

1. Edit the _.env.production.local_ file with configuration parameters
2. Open a terminal, go to the root folder of the project, and run:

```
# npm run build
```

3. Execute the start script:

```
# npm start
```

_Author: Antonio Martínez_
