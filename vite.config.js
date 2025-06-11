import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import jsConfigPaths from 'vite-jsconfig-paths';

// ================================================================================

export default ({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Disable ESLint for the next line
// eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react({
        // Add fast refresh options for better development experience
        fastRefresh: true,
        // Add babel options if needed
        babel: {
          plugins: [
            '@babel/plugin-transform-private-property-in-object', // Support for private class properties
            '@babel/plugin-transform-class-properties', // Support for class properties
            '@babel/plugin-transform-private-methods' // Support for private class methods
          ]
        }
      }),
      jsConfigPaths() // Enable path aliases from jsconfig.json
    ],
    define: {
      global: 'window', // Define global as window for compatibility

    },

    // Development server configuration
    server: {
      port: 3000, // Development server port
      host: true, // Listen on all addresses
      open: true, // Open browser on server start
      hmr: {
        clientPort: 3000, // WebSocket client port
        host: 'localhost', // WebSocket host
        protocol: 'ws', // WebSocket protocol
        timeout: 120000, // Connection timeout in ms
        overlay: true, // Show errors as overlay
        path: '@vite/client', // HMR client entry
        log: 'info', // HMR log level
        preserveSymlinks: true, // Preserve symlinks
        reloadOnFailure: true, // Reload page on HMR failure
        usePolling: true // Use polling for file changes
      },
      watch: {
        usePolling: true, // Use polling for file watching
        interval: 100, // Polling interval in ms
        ignored: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**', 'CHANGELOG.md', 'README.md', 'LICENSE'] // Ignored paths
      },
      strictPort: true, // Exit if port is already in use
      // Add proxy configuration if needed
      proxy: {
        // Example: '/api': 'http://localhost:8080'
      }
    },
    // Preview server configuration (for production builds)
    preview: {
      port: 3030, // Preview server port
      strictPort: true // Exit if port is already in use
    },
    // Build configuration
    build: {
      outDir: 'build', // Output directory
      sourcemap: false,
      minify: 'esbuild', // Use esbuild for minification (default and faster)
      chunkSizeWarningLimit: 1500, // Increase chunk size warning threshold in KB
      rollupOptions: {
        output: {
          manualChunks: {
            'core-vendor': ['react', 'react-dom', 'react-router'], // Core React dependencies
            'ui-vendor': [
              // Material-UI dependencies
              '@mui/material',
              '@mui/icons-material',
              '@emotion/react',
              '@emotion/styled',
              '@mui/system'
            ],
            'animation-vendor': ['framer-motion', '@iconify/react'], // Animation dependencies
            'table-vendor': ['material-react-table'], // Table library
            'table-components': [
              // Custom table components
              'src/components/Table/Columns/Columns.jsx',
              'src/components/Table/ReusableTable.jsx'
            ],
            'changelog': [
              // Changelog components
              'src/pages/Changelog/Changelog.jsx',
              'src/components/@extended/Markdown.jsx'
            ],
            'form-vendor': [
              // Form-related dependencies
              'react-hook-form',
              '@hookform/resolvers',
              'yup'
            ],
            'chart-vendor': [
              // Chart-related dependencies
              'apexcharts',
              'react-apexcharts'
            ]
          }
        }
      },
      // Exclude documentation files from build
      exclude: ['CHANGELOG.md', 'README.md', 'LICENSE', 'docs/**/*']
    },
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'], // Additional asset types to include
    // Dependency optimization
    optimizeDeps: {
      include: [
        // Dependencies to pre-bundle
        'react',
        'react-dom',
        'react-router',
        '@mui/material',
        'material-react-table',
        'framer-motion',
        'react-hook-form',
        '@hookform/resolvers/yup',
        'yup',
        'apexcharts',
        'react-apexcharts',
        'dayjs',
        'lodash'
      ],
      esbuildOptions: {
        target: 'es2020' // Specify target for esbuild
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' } // Silence specific esbuild warnings
    },
    // CSS configuration
    css: {
      devSourcemap: true, // Enable sourcemaps for CSS
      preprocessorOptions: {
        // Add preprocessor options if needed
      }
    }
  });
};
