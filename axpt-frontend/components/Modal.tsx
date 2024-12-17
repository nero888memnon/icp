import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth to access user context

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({ 
  isOpen, 
  title, 
  children, 
  onClose, 
  onConfirm, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel' 
}: ModalProps) {
  const { user } = useAuth(); // Access the user from AuthContext
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary text-white w-96 p-6 rounded-lg shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        <div className="mb-6">
          {children}
        </div>

        {user && (
          <div className="mb-4 text-sm text-green-500">
            <p>Authenticated as: <strong>{user.email}</strong></p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          {onConfirm && (
            <button 
              onClick={onConfirm} 
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              {confirmText}
            </button>
          )}
          <button 
            onClick={onClose} 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
