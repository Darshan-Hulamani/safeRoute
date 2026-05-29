import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { RouteProvider } from './context/RouteContext';
import { SOSProvider } from './context/SOSContext';
import SplashScreen from './components/ui/SplashScreen';
import './styles/globals.css';

function Root() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteProvider>
          <SOSProvider>
            <App />
            <Toaster position="bottom-center" />
          </SOSProvider>
        </RouteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);