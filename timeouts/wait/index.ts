export default (timeout = 1000) => {
  return new Promise(res => {
    setTimeout(res, timeout);
  });
};
