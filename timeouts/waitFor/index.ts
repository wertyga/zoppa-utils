import wait from '../wait';

export default (variable: any, waitTime = 30000): Promise<any | void> => {
  return new Promise(async res => {
    const timer = setTimeout(res, waitTime);

    while (!variable) {
      await wait(500);
    }

    clearTimeout(timer);

    res(variable);
  });
};
