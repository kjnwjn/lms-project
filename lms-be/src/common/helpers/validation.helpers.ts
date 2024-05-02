export const validationRegName = (name: string) => {
  const reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return reg.test(name);
};
