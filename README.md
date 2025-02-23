# Authentication System

This project is a full-stack authentication system with separate client and server directories. It provides user registration and login functionality using React for the frontend and Node.js with Express for the backend.

## Project Structure

```
repo/
│-- client/    # React frontend
│-- server/    # Node.js backend
```

### Client (React Frontend)
- Implements a user authentication UI with sign-up and login functionality.
- Uses `fetch` API to communicate with the backend.
- Features a password show/hide toggle.

### Server (Node.js Backend)
- Handles user authentication requests.
- Implements signup and login API endpoints.
- Uses environment variables for secure configurations.

## Installation

### Backend Setup
1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## API Endpoints
- **POST /signup** – Registers a new user.
- **POST /login** – Authenticates an existing user.

## Contributions
Feel free to fork this repository and contribute by submitting pull requests.

## License
This project is open-source and available under the MIT License.

