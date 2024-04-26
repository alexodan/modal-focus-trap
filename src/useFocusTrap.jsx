import { useEffect } from "react";

const focus = (elementRef) => {
  if (!elementRef.current) {
    return () => {};
  }
  const focusableElements = elementRef.current?.querySelectorAll(
    'button, input, a[href], [tabindex="0"], textarea, select'
  );
  const focusedElement = document.activeElement;
  const [first, last] = [
    focusableElements[0],
    focusableElements[focusableElements.length - 1],
  ];
  const cbFirst = (e) => {
    if (e.shiftKey && e.key == "Tab" && focusedElement === first) {
      e.preventDefault();
      console.log(last);
      last.focus();
    }
  };
  const cbLast = (e) => {
    if (e.code === "Tab" && focusedElement === last) {
      e.preventDefault();
      console.log(first);
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
