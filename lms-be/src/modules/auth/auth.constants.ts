export default (): Record<string, any> => ({
  jwtSecret: process.env.TOKEN,
});
