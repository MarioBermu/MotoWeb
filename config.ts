import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['leaflet', 'leaflet-draw']
  }
});
