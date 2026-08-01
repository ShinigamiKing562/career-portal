# Career Portal Server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create a `.env` file if needed):

```bash
# Configure your environment variables here
```

### Running the Server

To start the server from scratch:

```bash
npm start
```

The server will start and be accessible at `http://localhost:3000` (or your configured port).

### API Documentation

Once the server is running, access the Swagger UI for API testing:

- **Swagger Documentation**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Use the Swagger interface to:

- View all available endpoints
- Test API requests with different parameters
- See request/response schemas
- Generate sample API calls

### Development

To run the server in development mode with hot-reload:

```bash
npm run dev
```

### Troubleshooting

If the server fails to start:

1. Check that all dependencies are installed: `npm install`
2. Verify environment variables are configured correctly
3. Ensure the port is not already in use
4. Check server logs for error messages
