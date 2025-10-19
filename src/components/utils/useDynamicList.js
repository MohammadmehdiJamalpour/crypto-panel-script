// src/components/utils/useDynamicList.js
import { useCallback, useMemo, useState } from "react";

/**
 * useDynamicList(initial, { idKey?, factory? })
 *  - items: array
 *  - add(payload?) -> appends factory(payload, index)
 *  - remove(idx)
 *  - update(idx, patch)
 */
export default function useDynamicList(initial = [], opts = {}) {
  const { idKey = "id", factory } = opts;
  const [items, setItems] = useState(() => initial);

  const add = useCallback(
    (payload) => {
      setItems((prev) => {
        const idx = prev.length;
        const nextItem =
          typeof factory === "function"
            ? factory(payload, idx, prev)
            : payload ?? {};
        return [...prev, nextItem];
      });
    },
    [factory]
  );

  const remove = useCallback((idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const update = useCallback((idx, patch) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    );
  }, []);

  const api = useMemo(() => ({ items, add, remove, update, setItems }), [
    items,
    add,
    remove,
    update,
  ]);
  return api;
}
