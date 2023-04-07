function CreateLocal(key: string) {
  const getLocal: any = localStorage.getItem(key);
  const storage = (getLocal && JSON.parse(getLocal)) || [];
  const save = () => {
    localStorage.setItem(key, JSON.stringify(storage));
  };
  const store = {
    get() {
      return storage || [];
    },
    set(value: string | number, key: string) {
      const result = store.addValues(value, key);
      if (!result) {
        if (key) {
          storage.find(
            (item: { key: string; value: string | number }) => item.key === key
          ).value = value;
        }
      } else {
        storage.push(result);
      }
      save();
    },
    addValues(value: string | number, key: string) {
      if (!key) {
        return storage.includes(value) ? "" : value;
      } else {
        return storage.map((item: any) => item.key).includes(key)
          ? ""
          : { key, value };
      }
    },
    getValues(key: string) {
      return (
        storage.find(
          (item: { key: string; value: string | number }) => item.key === key
        )?.value || null
      );
    },
  };
  return store;
}

export const likeLocal = CreateLocal("likelocal");
export const starLocal = CreateLocal("starlocal");

export const bookmarkLocal = CreateLocal("bookmarkLocal");
