// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o app automaticamente quando houver nova versão
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.png'], // Arquivos estáticos
      manifest: {
        name: 'Coletor de Dados',
        short_name: 'Coletor',
        description: 'Aplicativo offline para coleta de estoque e códigos de barras',
        theme_color: '#0f172a', // Cor do topo do Android (igual ao nosso Dark Mode)
        background_color: '#0f172a',
        display: 'standalone', // Faz abrir como um app nativo, sem barra de navegação
        orientation: 'portrait',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/51200.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/51200.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Ideal para os ícones adaptáveis do Android
          }
        ]
      }
    })
  ]
});