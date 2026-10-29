import React, { useState } from 'react';
import PortfolioGame from './components/portfolioGame';
import TeamInfo from './components/teamInfo';
import './App.css'; 

export default function App() {
  const [activeTab, setActiveTab] = useState('game');

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 className="nav-title">Roadfolio</h1>
        <div className="nav-buttons">
          <button 
            className={activeTab === 'game' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('game')}
          >
            Juego 3D
          </button>
          <button 
            className={activeTab === 'info' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('info')}
          >
            Ver Información
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="tab-content" style={{ display: activeTab === 'game' ? 'flex' : 'none' }}>
          <PortfolioGame />
        </div>
        
        <div className="tab-content" style={{ display: activeTab === 'info' ? 'flex' : 'none' }}>
          <TeamInfo />
        </div>
      </main>
    </div>
  );
}