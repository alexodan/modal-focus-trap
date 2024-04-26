import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";
import { useOpenState } from "./useOpenState";

export const Modal = ({
  isOpen: isOpenProp,
  defaultOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef();
  const lastFocusableEl = useRef();
  const [open, setOpen] = useOpenState({
    defaultOpen: defaultOpen,
    isOpen: isOpenProp,
    onClose: onClose,
  });
  useFocusTrap(modalRef, [open]);

  useEffect(() => {
    if (open) {
      lastFocusableEl.current = document.activeElement;
      modalRef.current.focus();
    }
    return () => {
      if (lastFocusableEl.current) {
        lastFocusableEl.current.focus();
        lastFocusableEl.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.addEventListener("keydown", (e) => {
        console.log("typed:", e.key);
        if (e.key === "Escape") {
          // close the modal
          setOpen(false);
        }
      });
    }
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  // -1 makes it focusable with js but not with normal tab navigation
  return (
    <div className="modal-overlay">
      <div tabIndex="-1" className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
