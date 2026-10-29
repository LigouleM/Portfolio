import React, { useState, useEffect, useMemo, useRef } from 'react';
import { teamConfig } from './teamConfig'; 

export default function PortfolioGame() {
  const [activePopupId, setActivePopupId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  const { allLinks, allPopups } = useMemo(() => {
    return Object.values(teamConfig).reduce((acc, member) => {
        acc.allLinks = { ...acc.allLinks, ...member.links };
        acc.allPopups = { ...acc.allPopups, ...member.popups };
        return acc;
      }, { allLinks: {}, allPopups: {} }
    );
  }, []);

  useEffect(() => {
    const handleGodotMessage = (event) => {
      if (event.data) {
        if (event.data.type === 'GODOT_POPUP') {
          setActivePopupId(event.data.id);
        }
        if (event.data.type === 'GODOT_READY') {
          setIsLoading(false);
        }
      }
    };
    window.addEventListener('message', handleGodotMessage);
    return () => window.removeEventListener('message', handleGodotMessage);
  }, []);

  const handleClosePopup = () => {
    setActivePopupId(null);
    if (iframeRef.current && iframeRef.current.contentWindow.unpauseGodot) {
      iframeRef.current.contentWindow.unpauseGodot();
    }
  };

  const queryParams = new URLSearchParams(allLinks).toString();
  const activePopupData = activePopupId ? allPopups[activePopupId] : null;

  return (
    <div className="game-wrapper">
      
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <h2 className="loading-title">Cargando Experiencia 3D...</h2>
          <p className="loading-text">Preparando el motor gráfico</p>
        </div>
      )}

      <iframe
        ref={iframeRef}
        title="Navegación 3D"
        src={`/godot-game/index.html?${queryParams}`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="autoplay; fullscreen"
      />

      {activePopupData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{activePopupData.title}</h2>
            <p>{activePopupData.content}</p>
            <button className="close-btn" onClick={handleClosePopup}>
              Volver al recorrido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}