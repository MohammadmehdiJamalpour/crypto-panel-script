import  { useState } from "react";

import Modal from "./components/Modal.jsx";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex items-center justify-between p-4">
    
     
      </header>

      <main className="p-6">
        

        <button
          onClick={() => setOpen(true)}
          className="mt-6 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 ring-1 ring-white/10"
        >
          Open Modal
        </button>
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title="Enter Warehouse Panel">
        
      </Modal>
    </div>
  );
}
