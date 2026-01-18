# NG-T1-Project

## Project Goal
Build and deploy a simple lead collection landing page that collects Name, Email, and Phone, stores the data in a database, and is deployed live.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js with Express
- **Database**: MongoDB (Atlas)
- **Deployment**: Vercel/Netlify (Frontend), Render/Railway (Backend)

## Structure
- `frontend/`: React application
- `backend/`: Node.js Express server
- `database/`: Database related files

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB connection string (Atlas or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ohemanth/nirvista-task1.git
   cd nirvista-task1
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in `backend/` with:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Start server:
     ```bash
     npm run dev
     ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
   - Start frontend:
     ```bash
     npm run dev
     ```

## Deployment

### Backend (Render/Railway)
1. Push `backend` folder to GitHub.
2. Deploy as a Web Service.
3. Set Environment Variables (`MONGODB_URI`, `PORT`).

### Frontend (Vercel/Netlify)
1. Push `frontend` folder to GitHub.
2. Deploy as a React project.
3. Set Environment Variable `VITE_API_URL` to your live backend URL.
