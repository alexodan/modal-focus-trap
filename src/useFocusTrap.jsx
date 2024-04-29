import { useEffect } from "react";

const focus = (elementRef) => {
  if (!elementRef.current) {
    return () => {};
  }
  const focusableElements = elementRef.current?.querySelectorAll(
    'button, input, a[href], [tabindex="0"], textarea, select'
  );
  const [first, last] = [
    focusableElements[0],
    focusableElements[focusableElements.length - 1],
  ];
  const cbFirst = (e) => {
    if (e.shiftKey && e.key == "Tab") {
      e.preventDefault();
      last.focus();
    }
  };
  const cbLast = (e) => {
    if (e.code === "Tab") {
      e.preventDefault();
      first.focus();
    }
  };
  first.addEventListener("keydown", cbFirst);
  last.addEventListener("keydown", cbLast);
  return () => {
    first.removeEventListener("keydown", cbFirst);
    last.removeEventListener("keydown", cbLast);
  };
};

export function useFocusTrap(elementRef, dependencies) {
  useEffect(() => {
    const cleanup = focus(elementRef);
    return () => {
      cleanup();
    };
  }, [elementRef, dependencies]);
}
