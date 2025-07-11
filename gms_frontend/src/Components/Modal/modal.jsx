import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({ handleClose, content, header }) => {
  return (
    <div className='absolute top-24 left-1/2 transform -translate-x-1/2 z-50 w-[700px] bg-white rounded-lg p-6 shadow-xl border'>
      <div className='flex justify-between items-center border-b pb-2'>
        <h2 className='text-xl font-semibold'>{header}</h2>
        <button onClick={handleClose} className='text-red-600 hover:text-red-800'>
          <ClearIcon />
        </button>
      </div>
      <div className='mt-4'>{content}</div>
    </div>
  );
};

export default Modal;
