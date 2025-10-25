# SK Federation Information Management System for Libon, Albay

This project is an information management system designed for the Sangguniang Kabataan (SK) Federation of Libon, Albay. It aims to streamline operations, manage data, and improve communication within the federation and with the community.

## ✨ Features

- **Dashboard:** Centralized view for key information and statistics.
- **User Management:** Handles different user roles and permissions.
- **Event Management:** Schedule, track, and manage community events and attendance.
- **Report Generation:** Create and manage various reports.
- **Gallery:** A space for uploading and viewing photos.
- **Real-time Chat:** Enables instant communication.
- **Hotline Management:** A directory for important contact numbers.

## 🚀 Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Routing:** Tanstack Router
- **UI:** Shadcn UI, Tailwind CSS
- **State Management:** Tanstack Query
- **Forms:** React Hook Form, Zod
- **Linting & Formatting:** ESLint, Prettier

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- git

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/raymondreblando/sklibon-ims-webapp.git
    cd sklibon-lms-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your local configuration for the backend API URL and other necessary keys.

    ```env
    VITE_API_URL=http://localhost:3000
    VITE_MUNICIPALITY_ID=municipality_id
    VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    VITE_IMAGEKIT_AUTH_ENDPOINT=http://localhost:3000/api/image-kit/auth
    VITE_PUSHER_APP_KEY=your_pusher_app_key
    VITE_PUSHER_APP_CLUSTER=your_pusher_app_cluster
    ```

## 📜 Available Scripts

In the project directory, you can run the following commands:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Bundles the app for production.
- **`npm run lint`**: Lints the code using ESLint.
- **`npm run preview`**: Serves the production build locally for preview.

## Project Structure

The project follows a feature-based structure to keep the codebase organized and scalable.

```
/src
├── assets/         # Static assets like images and fonts
├── components/     # Reusable UI components
├── contexts/       # React contexts for state management
├── hooks/          # Custom React hooks
├── lib/            # Shared libraries, utils, and configs
├── routes/         # Route definitions using Tanstack Router
├── services/       # API service calls
└── types/          # TypeScript type definitions
```