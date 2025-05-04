
# Social Aware Connect API

Backend API for the Social Aware Connect platform.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/social-aware-connect
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRATION=7d
   ```

### Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Documentation

### Authentication Endpoints

- **Register**: `POST /api/auth/register`
  - Request body: `{ name, email, password }`
  - Response: User data with JWT token

- **Login**: `POST /api/auth/login`
  - Request body: `{ email, password }`
  - Response: User data with JWT token

- **Get Current User**: `GET /api/auth/me`
  - Headers: `x-auth-token: <jwt>`
  - Response: User data

- **Forgot Password**: `POST /api/auth/forgot-password`
  - Request body: `{ email }`
  - Response: Success message

- **Reset Password**: `POST /api/auth/reset-password/:token`
  - Request body: `{ password }`
  - Response: Success message

### Campaign Endpoints

- **Get All Campaigns**: `GET /api/campaigns`
  - Response: Array of campaigns

- **Get Campaign by ID**: `GET /api/campaigns/:id`
  - Response: Campaign data

- **Create Campaign**: `POST /api/campaigns`
  - Headers: `x-auth-token: <jwt>`
  - Request body: Campaign data
  - Response: Created campaign data

- **Update Campaign Status**: `PATCH /api/campaigns/:id/status`
  - Headers: `x-auth-token: <jwt>` (admin only)
  - Request body: `{ status }` (approved or rejected)
  - Response: Updated campaign data

- **Join Campaign**: `POST /api/campaigns/:id/join`
  - Headers: `x-auth-token: <jwt>`
  - Response: Updated campaign data

- **Share Campaign**: `POST /api/campaigns/:id/share`
  - Response: Updated campaign data

### Business Promotion Endpoints

- **Get All Business Promotions**: `GET /api/businesses`
  - Response: Array of business promotions

- **Get Business Promotion by ID**: `GET /api/businesses/:id`
  - Response: Business promotion data

- **Create Business Promotion**: `POST /api/businesses`
  - Headers: `x-auth-token: <jwt>`
  - Request body: Business promotion data
  - Response: Created business promotion data

- **Update Business Promotion Status**: `PATCH /api/businesses/:id/status`
  - Headers: `x-auth-token: <jwt>` (admin only)
  - Request body: `{ status }` (approved or rejected)
  - Response: Updated business promotion data

### Donation Endpoints

- **Get Donations by Campaign**: `GET /api/donations/campaign/:campaignId`
  - Response: Array of donations for the campaign

- **Make Donation**: `POST /api/donations`
  - Headers: `x-auth-token: <jwt>`
  - Request body: `{ campaignId, amount, displayName, message }`
  - Response: Created donation data
