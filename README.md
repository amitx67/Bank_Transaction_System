# Bank Transaction System — backend

## Setup

1. Install Node.js (LTS).
2. Run `npm install` in this project folder.
3. Copy `.env.example` to `.env` and fill in your MongoDB connection string and a long, random `JWT_SECRET`.
4. Start the development server with `npm run dev`.

The server connects to MongoDB before listening. The port is `PORT` from `.env` (defaults to `9000`).

## Register endpoint

- Method: `POST`
- URL: `http://localhost:<PORT>/api/v1/auth/register`
- Header: `Content-Type: application/json`
- JSON body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test123456"
}
```

The API returns the created user's public fields and a JWT, and sets an HTTP-only cookie. Passwords are hashed before being stored.

