import React, { useState } from 'react';
import { teamConfig } from './teamConfig'; 

export default function TeamInfo() {
  const teamMembers = Object.entries(teamConfig);
  const [activeCard, setActiveCard] = useState(null);

  // Variables matemáticas para el abanico
  const totalCards = teamMembers.length;
  const middleIndex = (totalCards - 1) / 2;

  return (
    <div className="team-info-container">
      
      {activeCard && (
        <div className="card-backdrop" onClick={() => setActiveCard(null)}></div>
      )}

      {/* Nuevo contenedor relativo para apilar las cartas en el centro */}
      <div className="cards-hand">
        {teamMembers.map(([memberKey, data], index) => {
          const isActive = activeCard === memberKey;

          // Cálculo del ángulo (10 grados de separación) y caída de los bordes
          const rotation = (index - middleIndex) * 8;
          const arcY = Math.abs(index - middleIndex) * 25;

          // Inyectamos los valores como variables CSS personalizadas
          const closedStyle = {
            '--rot': `${rotation}deg`,
            '--arcY': `${arcY}px`,
            zIndex: index
          };

          return (
            <div 
              key={memberKey} 
              className={`team-card ${isActive ? 'expanded' : ''}`}
              style={!isActive ? closedStyle : {}}
              onClick={() => { 
                if (!isActive) setActiveCard(memberKey); 
              }}
            >
              {!isActive ? (
                <h2 className="team-name-front">{memberKey.toUpperCase()}</h2>
              ) : (
                <div className="card-expanded-content">
                  <div className="card-header">
                    <h2 className="team-name">{memberKey.toUpperCase()}</h2>
                    <button 
                      className="close-card-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCard(null);
                      }}
                    >
                      Cerrar Carta
                    </button>
                  </div>
                  
                  <div className="team-links">
                    {Object.entries(data.links).map(([linkKey, url]) => (
                      <a key={linkKey} href={url} target="_blank" rel="noreferrer" className="team-link-btn">
                        {linkKey.includes('github') ? 'GitHub' : linkKey.includes('linkedin') ? 'LinkedIn' : 'Enlace'}
                      </a>
                    ))}
                  </div>

                  <div className="team-info-section">
                    {Object.values(data.popups).map((popup, idx) => (
                      <div key={idx} className="popup-block">
                        <h3 className="popup-title">{popup.title}</h3>
                        <p className="popup-desc">{popup.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}