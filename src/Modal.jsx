import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "./useFocusTrap";

export const Modal = ({
  isOpen: isOpenProp,
  defaultOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef();
  const lastFocusableEl = useRef();
  const [open, setOpen] = useState(isOpenProp ?? defaultOpen);

  useFocusTrap(modalRef, [open]);

  useEffect(() => {
    setOpen(isOpenProp);
  }, [isOpenProp]);

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
        if (e.key === "Escape") {
          onClose();
        }
      });
    }
  }, [open, onClose]);

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
