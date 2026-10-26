import React, { useState, useEffect } from 'react';

export default function PortfolioGame({ 
  customGithub = "https://github.com/LigouleM",
  customLinkedin = "https://www.linkedin.com/in/marcos-ligoule-ingalina-aa1b15162/" 
}) {
  
  // Estado para controlar qué popup está abierto (null = cerrado)
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    // Función que intercepta los mensajes del iframe
    const handleGodotMessage = (event) => {
      if (event.data && event.data.type === 'GODOT_POPUP') {
        setActivePopup(event.data.id);
      }
    };

    window.addEventListener('message', handleGodotMessage);
    
    // Limpieza del listener al desmontar el componente
    return () => window.removeEventListener('message', handleGodotMessage);
  }, []);

  const queryParams = new URLSearchParams({
    github: customGithub,
    linkedin: customLinkedin
  }).toString();

  return (
    // position: 'relative' es crucial para que el popup se posicione sobre el juego
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* EL JUEGO DE GODOT */}
      <iframe
        title="Navegación 3D"
        src={`/godot-game/index.html?${queryParams}`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="autoplay; fullscreen"
      />

      {/* EL POPUP DE REACT (Se renderiza solo si activePopup tiene un ID) */}
      {activePopup && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Información: {activePopup}</h2>
            
            {/* Aquí puedes renderizar distintos componentes dependiendo del ID */}
            {activePopup === 'sobre_mi' && <p>Soy desarrollador full-stack y de videojuegos...</p>}
            {activePopup === 'contacto' && <p>Escríbeme a mi correo: email@ejemplo.com</p>}
            
            <button 
              onClick={() => setActivePopup(null)}
              style={styles.closeButton}
            >
              Cerrar y volver al juego
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos rápidos en línea (puedes pasarlos a tu CSS normal)
const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10 // Se asegura de estar por encima del iframe
  },
  modal: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};