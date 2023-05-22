export default {
  Authentication: {
    name: process.env.AUTH_SERVICE_NAME || 'Authentication',
    path: process.env.AUTH_SERVICE_PATH || 'auth',
    host: process.env.AUTH_SERVICE_HOST || 'http://localhost',
    port: process.env.AUTH_SERVICE_PORT || 3001
  },
  Payment: {
    name: process.env.PAY_SERVICE_NAME || 'payment',
    path: process.env.PAY_SERVICE_PATH || 'pay',
    host: process.env.PAY_SERVICE_HOST || 'http://localhost',
    port: process.env.PAY_SERVICE_PORT || 3001
  },
  Wallet: {
    name: process.env.WALLET_SERVICE_NAME || 'wallet',
    path: process.env.WALLET_SERVICE_PATH || 'wallet',
    host: process.env.WALLET_SERVICE_HOST || 'http://localhost',
    port: process.env.WALLET_SERVICE_PORT || 3002
  }
};
