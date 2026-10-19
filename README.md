
# Banking API

A backend banking application built with Node.js, Express.js, and MongoDB. The project provides user authentication and account management using JWT-based authentication.

## Features

- User registration
- User login and logout
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes using authentication middleware
- Bank account creation
- Account status management
- Currency configuration (INR by default)
- MongoDB integration using Mongoose
- Welcome email integration

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **cookie-parser** — Cookie parsing
- **dotenv** — Environment variable management

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controller/
│   ├── account.controller.js
│   └── auth.controller.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── account.model.js
│   └── user.model.js
├── routes/
│   ├── account.routes.js
│   └── auth.routes.js
├── services/
│   └── email.service.js
└── app.js

server.js
.env
.env.example
package.json
README.md
```

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A MongoDB database, either local MongoDB or MongoDB Atlas

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root directory.

Use `.env.example` as a reference and configure the variables required by your application.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Add any additional environment variables required by your email service.

**Important:** Never commit your `.env` file or publish database credentials, JWT secrets, or email tokens.

### 4. Start the server

For development:

```bash
npm run dev
```

If your `package.json` does not define a development script, start the server with:

```bash
node server.js
```

The server will run on the port specified in your `.env` file.

Example:

```text
http://localhost:3000
```

## API Endpoints

Base URL:

```text
http://localhost:3000/api/v1
```

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Log in an existing user | No |
| POST | `/auth/logout` | Log out and clear the authentication cookie | No |
 
### Accounts

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/accounts` | Create a bank account | Yes |

Authentication requirements depend on the middleware configured for each route.

## Example Requests

### Register a user

```http
POST /api/v1/auth/register
Content-Type: application/json
```

Example JSON body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "YourStrongPassword123"
}
```

### Log in

```http
POST /api/v1/auth/login
Content-Type: application/json
```

Example JSON body:

```json
{
  "email": "test@example.com",
  "password": "YourStrongPassword123"
}
```

The server should set the authentication cookie when login succeeds.

### Create an account

```http
POST /api/v1/accounts
Content-Type: application/json
```

The request must include the valid authentication cookie.

Example JSON body:

```json
{
  "currency": "INR"
}
```

The exact request fields depend on the account controller implementation.

### Log out

```http
POST /api/v1/auth/logout
```

The logout endpoint clears the authentication cookie according to the server's cookie configuration.

## Account Model

Each account supports the following fields:

| Field | Description |
|---|---|
| `user` | Reference to the associated user |
| `status` | `ACTIVE`, `FROZEN`, or `CLOSED` |
| `currency` | Currency code, defaulting to `INR` |
| `createdAt` | Automatically generated creation timestamp |
| `updatedAt` | Automatically generated update timestamp |

## Security

- Passwords should be hashed before being stored.
- JWT secrets must be stored in environment variables.
- Authentication cookies should use appropriate `httpOnly`, `secure`, and `sameSite` settings.
- Protected routes must validate the authentication token.
- Never log passwords, tokens, or other sensitive credentials.
- Validate user input before processing requests.
- Use HTTPS in production.
- Configure database access permissions appropriately.

## Troubleshooting

### MongoDB connection errors

- Verify that `MONGO_URI` is correct.
- Check that your database is running.
- For MongoDB Atlas, check network access and database-user permissions.
- Confirm that your DNS and internet connection are working.

### Authentication errors

- Confirm that `JWT_SECRET` is configured.
- Verify that the login endpoint sets the authentication cookie.
- Ensure that requests to protected endpoints include the cookie.
- Check that cookie settings are compatible with your frontend origin.

### Request body is undefined

Ensure that JSON middleware is registered before your routes:

```js
app.use(express.json());
```

### Email delivery errors

Check the email service credentials, OAuth configuration, and required permissions.

## Development Notes

This project is a backend learning project focused on authentication, database integration, and account management.

It is not a production-ready banking system. Real financial transactions require additional controls, including transaction processing, authorization rules, audit logging, fraud prevention, and appropriate regulatory and security reviews.

## License

Add a license before distributing this project publicly.
