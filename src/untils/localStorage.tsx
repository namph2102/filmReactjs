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
    set(value: any, key?: string) {
      const result = store.addValues(value, key);
      if (!result) {
        if (key) {
          storage.find(
            (item: { key: string; value: any }) => item.key === key
          ).value = value;
        }
      } else {
        storage.push(result);
      }
      save();
    },
    addValues(value: any, key?: string) {
      if (!key) {
        return storage.includes(value) ? "" : value;
      } else {
        return storage.map((item: any) => item.key).includes(key)
          ? ""
          : { key, value };
      }
    },
    checkExtended(value: string) {
      return storage.includes(value);
    },
    deleteValue(value: any, key?: string) {
      if (key) {
        const index = storage.findIndex((item: any) => item.key === key);
        if (index) {
          storage.splice(index, 1);
        }
      } else {
        if (storage.indexOf(value)) {
          storage.splice(storage.indexOf(value), 1);
        }
      }
      save();
    },
    getValues(key: any) {
      if (key)
        return (
          storage.find((item: { key: string; value: any }) => item.key === key)
            ?.value || null
        );
    },
  };
  return store;
}

export const likeLocal = CreateLocal("likelocal");
export const bookmarkLocal = CreateLocal("bookmarkLocal");
//
type TBookmarkLocal = {
  key: string;
  value: {
    time: Date;
    avata: string;
    name: string;
    slug: string;
  };
};
