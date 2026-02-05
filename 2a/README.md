# Seat Booking Application

A modern Angular-based web application for event seat booking with user authentication and profile management.

## Features

- **User Authentication**: Register and Login functionality
- **User Profile**: View and manage user information
- **Seat Booking System**: Browse events and book seats in real-time
- **Event Management**: Multiple events with different venues
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- Angular 21+
- TypeScript
- RxJS
- CSS3
- Google Fonts (Poppins, Inter)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   ├── profile/
│   │   └── seat-booking/
│   ├── services/
│   │   ├── auth.ts          # Authentication service
│   │   └── booking.ts       # Seat booking service
│   ├── app.routes.ts        # Application routing
│   └── app.ts               # Root component
└── styles.css               # Global styles
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify any source files.

## Demo Credentials

- **Email**: demo@example.com
- **Password**: password123

## Building

To build the project run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/scorpionawaz/WADL_33363.git
cd seat-booking-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve --open
```

## Features Guide

### Registration
- Create a new account with email, password, name, and phone number
- Validation for password strength and matching passwords

### Login
- Login with registered credentials
- Try demo account for quick access

### Profile
- View user information
- See all booked seats
- Cancel previous bookings

### Seat Booking
- Browse available events
- View seat layout in real-time
- Select and book multiple seats
- See booking confirmation

## License

This project is open source and available under the MIT License.

