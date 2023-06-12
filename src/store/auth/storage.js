export const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(error);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(error);
      }
    },
  };