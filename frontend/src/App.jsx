import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={user ? <ChatPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <RegisterPage /> : <Navigate to="/" />} 
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;