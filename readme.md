# Stock Dashboard

A full-stack web application for managing and visualizing stock data, built with React and NestJS.

### Technologies Used

- React
- React-hook-form for form handling
- Zod for data validation
- Redux Toolkit for state management
- RTK Query for API calls
- Material-UI for UI components
- React Router for navigation
- SCSS for custom styling

### Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── router/
│   │       └── router.tsx
│   ├── components/
│   │   ├── info-card/
│   │   │   ├── info-card.tsx
│   │   │   └── info-card.scss
│   │   ├── loading/
│   │   │   └── loading.scss
│   │   ├── nav-link/
│   │   │   └── nav-link.tsx
│   │   ├── page-header/
│   │   │   ├── page-header.tsx
│   │   │   └── page-header.scss
│   │   ├── products/
│   │   │   ├── products-table.tsx
│   │   │   ├── products-columns.tsx
│   │   │   ├── products-search-bar.tsx
│   │   │   ├── products-snackbar.tsx
│   │   │   └── products-table-edit-toolbar.tsx
│   │   │   └── products-material-use-modal.tsx
│   │   └── sidebar/
│   │       ├── list/
│   │       │   ├── sidebar-item.tsx
│   │       │   ├── sidebar-list.tsx
│   │       │   └── sidebar-list.scss
│   │       ├── sidebar.tsx
│   │       └── sidebar.scss
│   ├── hoc/
│   │   └── with-auth.tsx
│   ├── layout/
│   │   ├── auth-layout/
│   │   │   └── auth-layout.scss
│   │   └── protected-layout/
│   │       ├── protected-layout.tsx
│   │       └── protected-layout.scss
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── dashboard.scss
│   │   ├── login/
│   │   │   ├── login.tsx
│   │   │   └── login.scss
│   │   ├── not-found/
│   │   │   ├── not-found.tsx
│   │   │   └── not-found.scss
│   │   ├── products/
│   │   │   ├── products.tsx
│   │   │   └── products.scss
│   │   └── register/
│   │       ├── register.tsx
│   │       └── register.scss
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── auth-slice.ts
│   │   │   └── product-slice.ts
│   │   └── store.ts
│   ├── schemas/
│   │   └── login-schema.ts
│   │   └── product-use-schema.ts
│   │   └── register-schema.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── product.ts
│   ├── shared/
│   │   └── constants.ts
│   └── types/
│       ├── auth.types.ts
│       └── product.types.ts
└── package.json
```

## Backend

The backend is built with NestJS, providing a robust and scalable API for data management and user authentication.

### Key Features

- RESTful API endpoints for stock data CRUD operations
- User authentication and authorization
- Data persistence with PostgreSQL database

### Technologies Used

- NestJS
- TypeORM for database interactions
- JWT for token-based authentication
- PostgreSQL as the database

### Project Structure

```
backend/
├── src/
│   ├── lib/
│   │   ├── baseEntity/
│   │   │   └── base.entity.ts
│   │   └── constants/
│   │       ├── errors.ts
│   │       └── jwtConstants.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── update-product-count.dto.ts
│   │   │   ├── update-product-status.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── login-user.dto.ts
│   │   │   ├── login-user-response.dto.ts
│   │   │   └── user-response.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (version 18.x or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/dogukangoker/stock-dashboard.git
   ```

2. Install frontend dependencies:

   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```
   cd ../backend
   npm install
   ```

4. Set up the PostgreSQL database and update the connection details in `backend/src/app.module.ts`.

5. Start the backend server:

   ```
   npm run start:dev
   ```

6. Start the frontend development server:

   ```
   cd ../frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Usage

- Use the login or register page to access the dashboard.
- The sidebar provides navigation to different sections of the application.
- Use the Products page to manage and visualize stock data.
- Protected routes ensure that only authenticated users can access certain parts of the application.
