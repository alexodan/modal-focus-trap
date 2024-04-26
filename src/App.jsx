import { useState } from "react";
import { fruits } from "./constants";
import "./styles.css";
import { Modal } from "./Modal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState("");

  return (
    <div className="App">
      {fruits.map((fruit) => (
        <div key={fruit.name}>
          {fruit.name}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setColorSelected(fruit.color);
            }}
          >
            Show color {fruit.color}
          </button>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <button
          onClick={() => {
            setIsModalOpen(false);
            setColorSelected("");
            // buttonRef.current.focus();
          }}
        >
          {/* screen reader will read the span / aria-label wont translate sometimes */}
          <span className="sr-only">Close</span>x
        </button>
        <input type="text" />
        <p>Color is {colorSelected}</p>
      </Modal>
    </div>
  );
}

// Modal, ModalOverlay, children=content/button to close
// DOM - where is shown
// A11y - mobile support, tab navigation
