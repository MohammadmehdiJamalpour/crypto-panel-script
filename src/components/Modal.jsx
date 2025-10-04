import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // <- add this

export default function Modal({ open, onClose, title = "Modal title", children }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-gray-900 text-white px-6 py-3 shadow-xl ring-1 ring-white/10">
                {/* Top-right close */}
                <div className="flex justify-between items-center ">
                <Dialog.Title className="text-lg text-center w-11/12  font-semibold">{title}</Dialog.Title>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className=" inline-flex items-center justify-center duration-300 bg-white/10 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </button>
               </div>
                <div className="mt-4">{children}</div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg duration-300 bg-white/10 hover:bg-white/20 ring-1 ring-white/20"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
