import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginModal from './components/LoginModal';
import HomePage from './components/HomePage';
import TrainersPage from './components/TrainersPage';
import SectionSchedulePage from './components/SectionSchedulePage';
import BookingsPage from './components/BookingsPage';

function App() {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo.png" alt="Логотип СК ім. В. Окіпного" className="navbar-logo me-2" />
            СК ім. В. Окіпного
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/trainers">Тренери</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="sectionsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Секції
                </a>
                <ul className="dropdown-menu" aria-labelledby="sectionsDropdown">
                  <li><Link className="dropdown-item" to="/section/Футбол">Футбол</Link></li>
                  <li><Link className="dropdown-item" to="/section/Йога">Йога</Link></li>
                  <li><Link className="dropdown-item" to="/section/Бокс">Бокс</Link></li>
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {!user ? (
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogin}>
                    Вхід
                  </button>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.username}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/bookings">Мої записи</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Вийти</button></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/bookings" element={<BookingsPage user={user} />} />
          <Route path="/section/:sport" element={<SectionSchedulePage user={user} setShowLoginModal={setShowLoginModal} />} />
        </Routes>
      </div>

      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSubmit}
        />
      )}
    </Router>
  );
}

export default App;