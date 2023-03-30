class LocalStorage {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return value;
  }

  update(key: string, value: any) {
    let prevValue = this.get(key);
    let newValue;

    if (Array.isArray(value)) {
      if (Array.isArray(prevValue)) {
        newValue = [...prevValue, ...value];
      } else {
        newValue = value;
      }
    } else if (typeof value === 'object') {
      newValue = { ...value };
      if (typeof prevValue === 'object') {
        Object.assign(newValue, prevValue);
      }
    }

    this.set(key, newValue);

    return newValue;
  }
}

export const localStorage = new LocalStorage();
