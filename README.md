# Stream Lab

Stream Lab is a modern web application designed for video streaming and AI content creation. It features a robust role-based system (User, Admin, Manager), an Creator Lab, and subscription management.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Secure access for Users, Admins, and Managers.
- **Creator Lab**: Tools for AI-driven content creation.
- **Video Streaming**: High-quality video playback powered by Video.js.
- **Subscription Management**: Plan selection and management.
- **Responsive Design**: Built with Tailwind CSS for a seamless mobile and desktop experience.
- **Modern UI/UX**: Utilizes Radix UI primitives and GSAP animations for a polished look.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript / React
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Hugeicons](https://hugeicons.com/)
- **Animations**: [GSAP](https://gsap.com/), [TW Animate CSS](https://github.com/ikcb/tw-animate-css)
- **Video Player**: [Video.js](https://videojs.com/)
- **Utilities**: `clsx`, `tailwind-merge`, `sonner` (toast notifications)

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd stream-lab-web-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

A brief overview of the main directories:

- `app/`: Next.js App Router structure.
  - `(auth)`: Authentication routes (login, register, etc.).
  - `(roles)`: Role-specific layouts and pages (`admin`, `manager`, `user`).
- `components/`: Reusable React components.
- `constants/`: Configuration and constant values.
- `redux/`: Redux store and slices.
- `public/`: Static assets.
