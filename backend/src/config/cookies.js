const COOKIE_OPTIONS = {
  maxAge: configs.tokenExpiration,
  httpOnly: true,
  secure: configs.node_env === 'production',
  sameSite: 'strict',
  path: '/',
};