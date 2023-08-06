import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },

  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
  }
  
});
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [reactRefresh()],
//   server: {
//     port: 3000,
//   },
// });