import React from 'react';

export default function PortfolioGame() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        title="Navegación 3D"
        src="/godot-game/index.html"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}