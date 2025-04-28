# [TaskyAI - AI-Powered Task Management Platform](https://taskyai-ai-powered-saas-platform-react.vercel.app/)

**A modern task management application built with React that helps users organize tasks, create projects, and leverage AI for automated task generation. TaskyAI provides a seamless experience for personal and team productivity.**

![Application Screenshot](/taskyai-ai-powered-saas-platform.png "Application Screenshot")

## 🚀 Features  

- **Task Management**: Create, organize, and track tasks with due dates
- **AI Task Generation**: Use AI to automatically generate tasks for your projects
- **Project Organization**: Create and manage projects with custom colors
- **Task Categorization**: Organize tasks by inbox, today, upcoming, and completed
- **User Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Works seamlessly on all device sizes

## 🛠️ Technologies Used  

- **Frontend**:  
  - [React 19](https://react.dev/) - JavaScript library for building user interfaces
  - [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

- **Backend**:  
  - [Appwrite](https://appwrite.io/) - Backend as a Service (BaaS) platform
  - [Clerk](https://clerk.com/) - Authentication and user management

- **AI Integration**:  
  - [Google Gemini AI](https://ai.google.dev/) - AI task generation

- **Programming Language**:  
  - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

- **Styling**:  
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com/) - A collection of accessible and customizable UI components

## 📦 NPM Packages  

- [React Router](https://reactrouter.com/) - Routing for React applications
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [class-variance-authority](https://cva.style/docs) - UI component variants
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [Chrono](https://github.com/wanasit/chrono) - Natural language date parsing

## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/taskyai-ai-powered-saas-platform-react.git
cd taskyai-ai-powered-saas-platform-react
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file with the following variables:

```
# CLERK
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/auth-sync"
VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/auth-sync"

# APPWRITE
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_TASKS_ID=
VITE_APPWRITE_PROJECTS_ID=

# GEMINI API
VITE_GEMINI_API_KEY=
```

### 4. Run the Application

```bash
npm run dev
# or
yarn dev
```

### 5. Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser to access the application.

## 🔒 Authentication 

The application uses Clerk for secure authentication with support for:
- Email and password authentication
- Social login (Google, GitHub, etc.)
- Two-factor authentication

## 🤖 AI Features

- **Task Generation**: AI-powered automatic task generation for projects
- **Smart Organization**: Intelligent organization of tasks into appropriate categories
- **Natural Language Processing**: Parse dates from natural language input

## 🤝 Contribute

1. Fork this repository
2. Create a branch for your changes (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

All contributions are welcome!