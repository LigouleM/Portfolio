import React, { useState, useEffect, useMemo } from 'react';
import { teamConfig } from './teamConfig'; 

export default function PortfolioGame() {
  const [activePopupId, setActivePopupId] = useState(null);

  // useMemo evita recalcular esto en cada renderizado de React
  const { allLinks, allPopups } = useMemo(() => {
    return Object.values(teamConfig).reduce(
      (acc, member) => {
        // Juntamos todos los links de todos los miembros
        acc.allLinks = { ...acc.allLinks, ...member.links };
        // Juntamos todos los popups de todos los miembros
        acc.allPopups = { ...acc.allPopups, ...member.popups };
        return acc;
      },
      { allLinks: {}, allPopups: {} }
    );
  }, []);

  useEffect(() => {
    const handleGodotMessage = (event) => {
      if (event.data && event.data.type === 'GODOT_POPUP') {
        setActivePopupId(event.data.id);
      }
    };

    window.addEventListener('message', handleGodotMessage);
    return () => window.removeEventListener('message', handleGodotMessage);
  }, []);

  // Generamos la query string con los links de todo el equipo
  const queryParams = new URLSearchParams(allLinks).toString();
  
  // React encuentra el contenido al instante en el objeto unificado
  const activePopupData = activePopupId ? allPopups[activePopupId] : null;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        title="Navegación 3D"
        src={`/godot-game/index.html?${queryParams}`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="autoplay; fullscreen"
      />

      {activePopupData && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>{activePopupData.title}</h2>
            <p>{activePopupData.content}</p>
            
            <button onClick={() => setActivePopupId(null)} style={styles.closeButton}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 10
  },
  modal: {
    backgroundColor: 'white', padding: '40px', borderRadius: '12px',
    maxWidth: '500px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
  },
  closeButton: {
    marginTop: '20px', padding: '10px 20px', backgroundColor: '#333',
    color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
  }
};