import wait from '../wait';

export default async (
  selector: string,
  waitTime = 30000
): Promise<HTMLElement | void> => {
  let tag = null;

  return new Promise(async res => {
    tag = document.querySelector(selector);
    const timer = setTimeout(res, waitTime);

    while (!tag) {
      await wait(500);
      tag = document.querySelector(selector);
    }

    clearTimeout(timer);
    res(tag);
  });
};
