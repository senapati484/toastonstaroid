import React from 'react';

export default function ToastError({ message, style = {}, icon = '❌', ...rest }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#e74c3c', color: '#fff', padding: '10px 20px', borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', ...style
      }}
      {...rest}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
