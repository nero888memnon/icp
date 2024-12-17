// axpt-frontend/next.config.js

const nextConfig = {
    reactStrictMode: true, // Enabling React Strict Mode for the frontend
    pageExtensions: ['tsx', 'ts', 'js', 'jsx'], // Custom file extensions for frontend pages
  
    // Handle webpack and other frontend-specific settings here
    webpack(config, { isServer }) {
      // Additional webpack configuration can go here
      return config;
    },
  
    // Environment variables specific to frontend can be added here
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Accessible on the client side
    },
  };
  
  module.exports = nextConfig;
  