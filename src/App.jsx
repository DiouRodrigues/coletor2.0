// src/App.jsx
import { useState, useEffect } from 'react';
import BasicCollector from './components/BasicCollector';
import AdvancedCollector from './components/AdvancedCollector';
import './App.css';

function App() {
  const [activeScreen, setActiveScreen] = useState('basic');
  
  // Estados para a Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOutSplash, setFadeOutSplash] = useState(false);

  useEffect(() => {
    // Passo 1: Inicia a animação de sumir (fade-out) após 2 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOutSplash(true);
    }, 2000); // 2000 ms = 2 segundos

    // Passo 2: Remove o componente da tela completamente após 2.6 segundos
    // (Dá tempo da animação CSS terminar)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2600);

    // Limpeza dos timers caso o componente seja desmontado
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Se a Splash Screen estiver ativa, renderiza ela no topo de tudo
  if (showSplash) {
    return (
      <div className={`splash-screen ${fadeOutSplash ? 'fade-out' : ''}`}>
        <div className="splash-logo">
         
         <img src="../512.png" alt="Logo da Empresa" /> 
          
        </div>
      </div>
    );
  }

  // Quando showSplash for false, renderiza o App normalmente
  return (
    <div className="app-layout app-content">
      <header>
        <h1>Sistema de Coleta</h1>
        <nav>
          <button 
            className={activeScreen === 'basic' ? 'active' : ''} 
            onClick={() => setActiveScreen('basic')}
          >
            Coleta Simples
          </button>
          <button 
            className={activeScreen === 'advanced' ? 'active' : ''} 
            onClick={() => setActiveScreen('advanced')}
          >
            Coleta Avançada
          </button>
        </nav>
      </header>

      <main>
        {activeScreen === 'basic' ? <BasicCollector /> : <AdvancedCollector />}
      </main>
    </div>
  );
}

export default App;