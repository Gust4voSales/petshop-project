export const jwtConstants = {
  jwtSecret: process.env.JWT_SECRET_KEY,
  refreshTokenSecret: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: '30d',
  refresthTokenExpiresIn: '30d'
}