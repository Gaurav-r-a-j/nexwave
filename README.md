# Next.js Simple Dashboard

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The project includes authentication functionality using React Context, `useRouter` for navigation, and local storage for token management. A loading state is handled to enhance user experience.

## Features

- **Authentication**:
  - Users can log in with valid credentials.
  - A token is stored in local storage after successful login.
  - Token-based session persistence and redirection.
  - Logout functionality to clear session data.
  - Loading states for smoother user feedback during authentication processes.
  - Error handling with toast notifications for failed login attempts or other errors.
  
- **Routing**:
  - Authenticated users are redirected to the `/employees` page.
  - Non-authenticated users are redirected to the `/login` page.

- **State Management**:
  - User and token data are managed using React Context.
  - The `loading` state ensures proper feedback during authentication processes.

## Installation

Follow the steps below to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the required dependencies using your package manager of choice:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Environment Variables (Optional)

If you need API endpoints or other environment-specific configurations, create a `.env.local` file in the root of the project and add your variables there.

### 5. Login Credentials

For demonstration purposes, you can use the following login credentials:

- **Email**: `demo@example.com`
- **Password**: `demo123`

## Code Overview

### Authentication Logic

- **Context Setup**:  
  Authentication state is managed via a custom React Context (`AuthContext`).  
  It provides `user`, `login`, `logout`, `token`, and `loading` states.

- **Login**:  
  Validates user credentials, stores a mock token in local storage, and updates the user state. On success, redirects to the `/employees` page.

- **Logout**:  
  Clears the token and user state, removes the token from local storage, and redirects to the `/login` page.

- **Session Persistence**:  
  On app load, the token is retrieved from local storage, and if valid, the user is automatically logged in and redirected.

### Loading State

- Used during login, logout, and session validation to provide visual feedback to users (e.g., a spinner or loading message).

### Error Handling

- Handled through toast notifications (`sonner` library) for invalid credentials or other failures.

### Routing

- Authenticated users are redirected to the `/employees` page after login.
- Non-authenticated users attempting to access protected routes are redirected to `/login`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out the [Next.js GitHub repository](https://github.com/vercel/next.js/). Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

This updated README provides a clear overview of the project, including features, installation instructions, and authentication functionality. Let me know if you'd like further refinements!