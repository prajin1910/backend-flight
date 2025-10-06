# Flight Booking System - Backend API

A robust Node.js backend API for a comprehensive flight booking system with authentication, booking management, and admin features.

## 🚀 Features

- **Authentication**: JWT-based user authentication and authorization
- **Flight Management**: Search, filter, and manage flight data
- **Booking System**: Complete booking flow with seat selection
- **Email Service**: Automated email notifications with QR codes
- **Admin Dashboard**: Administrative controls and statistics
- **Secure API**: Protected routes and data validation

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing
- **QR Code** - Booking confirmation codes

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Gmail account with app password

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Deploy to Render

1. Push this backend folder to GitHub
2. Connect to Render
3. Set environment variables in Render dashboard
4. Use build command: `npm install`
5. Use start command: `npm start`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify token

### Flights
- `GET /api/flights` - Search flights
- `GET /api/flights/:id` - Get flight details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get booking details

### Admin
- `GET /api/admin/dashboard` - Admin statistics
- `POST /api/admin/flights` - Add flight
- `PUT /api/admin/flights/:id` - Update flight
- `DELETE /api/admin/flights/:id` - Delete flight

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration
- Input validation and sanitization
- Error handling middleware

## 📊 Health Check

Visit `/api/health` to check if the API is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.