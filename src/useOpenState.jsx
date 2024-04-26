import { useEffect, useState } from "react";

export function useOpenState({ defaultOpen, isOpen, onClose }) {
  console.log("defaultOpen, isOpen", defaultOpen, isOpen);
  const [value, setValue] = useState(defaultOpen);

  useEffect(() => {
    setValue(isOpen);
    return () => {
      if (isOpen) {
        onClose();
      }
    };
  }, [isOpen, onClose]);

  return [value, setValue];
}
