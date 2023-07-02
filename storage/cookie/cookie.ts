class Cookie {
  state: Record<string, string>;
  private subscribers = [];

  constructor(cookies: string) {
    this.state = this.parseCookies(cookies);
  }

  private parseCookies = (rawCookies: string): Record<string, string> => {
    if (!rawCookies) {
      return {};
    }
    return rawCookies.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      return {
        ...acc,
        [key]: value,
      };
    }, {});
  };

  set(name: string, value, days?: number) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    this.state = {
      ...this.state,
      [name]: value,
    };
  }

  get(name: string) {
    return this.state[name];
  }

  getAll() {
    return this.state;
  }

  delete(name: string) {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete this.state[name];
  }
}

export let cookies: Cookie;
export const initializeCookieStore = (cookiesString: string) => {
  cookies = new Cookie(cookiesString);
};
