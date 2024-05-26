import { Dialog } from '@headlessui/react';

const Modal = ({ isVisible, onClose, children }) => {
    return (
        <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" open={isVisible} onClose={onClose}>
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
      
            <div className="relative inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-gray-900 bg-opacity-80 p-6 text-left align-middle shadow-lg shadow-white/30 transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                {/* title to add */}
              </Dialog.Title>
              <div className="mt-2 text-white">
                {children}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      );      
};

export default Modal;
