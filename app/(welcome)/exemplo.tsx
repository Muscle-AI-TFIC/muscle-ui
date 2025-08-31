// app/(welcomeModal)/exemplo.tsx
'use client';

import React, { useState, useEffect } from 'react';
import WelcomeModal from './welcomeModal';

const WelcomePage: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [userData, setUserData] = useState({
    name: "Visitante",
    lastLogin: new Date().toLocaleDateString('pt-BR')
  });

  // Simula carregamento de dados do usuário
  useEffect(() => {
    // Aqui você buscaria os dados reais da API
    setTimeout(() => {
      setUserData({
        name: "Carlos Silva",
        lastLogin: "10 de Outubro de 2023"
      });

      // Mostrar o tutorial após carregar os dados (apenas na primeira vez)
      const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
        localStorage.setItem('hasSeenTutorial', 'true');
      }
    }, 1000);
  }, []);

  return (
    <div style={pageStyles.container}>
      {/* Seu conteúdo normal da página */}
      <header style={pageStyles.header}>
        <h1 style={pageStyles.title}>MuscleAI</h1>
        <button
          style={pageStyles.tutorialButton}
          onClick={() => setShowTutorial(true)}
        >
          🔄 Ver Tutorial Novamente
        </button>
      </header>

      <main style={pageStyles.main}>
        <div style={pageStyles.welcomeCard}>
          <h2>Bem-vindo de volta, {userData.name}!</h2>
          <p>Sua última visita foi em {userData.lastLogin}</p>
        </div>
      </main>

      {/* Modal de tutorial */}
      <WelcomeModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        userName={userData.name}
      />
    </div>
  );
};

const pageStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
  },
  tutorialButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  main: {
    padding: '2rem',
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center' as 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default WelcomePage;