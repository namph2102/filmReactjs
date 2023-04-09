function CreateLocal(key: string) {
  const getLocal: any = localStorage.getItem(key);
  const storage = (getLocal && JSON.parse(getLocal)) || [];
  const save = (listitems: any = "") => {
    localStorage.setItem(key, JSON.stringify(listitems ? listitems : storage));
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
        save([...storage, result]);
        return;
      }
      save();
    },
    addValues(value: any, key?: string) {
      if (!key) {
        if (value.name) {
          return storage.find((item: any) => item.name == value.name)
            ? null
            : value;
        }
        return storage.includes(value) ? null : value;
      } else {
        return storage.map((item: any) => item.key).includes(key)
          ? ""
          : { key, value };
      }
    },
    checkExtended({ value, keyCheck }: { value: string; keyCheck: string }) {
      // TBookmarkLocal[]
      return storage.find((item: any) => item[keyCheck] == value)
        ? true
        : false;
    },
    deleteValue(value: any, key?: string) {
      if (key) {
        const index = storage.findIndex((item: any) => item.key === key);
        if (index >= 0) {
          storage.splice(index, 1);
        }
      } else {
        if (value.keyCheck) {
          if (store.checkExtended(value)) {
            const newStore = storage.filter(
              (item: any) => item[value.keyCheck] !== value.value
            );
            save(newStore);
          }
          return;
        } else if (storage.indexOf(value)) {
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
//t
type TlikeLocal = {
  key: string;
  value: string;
};
export const bookmarkLocal = CreateLocal("bookmarkLocal");
//
type TBookmarkLocal = {
  time: Date;
  avata: string;
  name: string;
  slug: string;
};
