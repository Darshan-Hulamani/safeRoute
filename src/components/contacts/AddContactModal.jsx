import React, { useState } from 'react';
import BottomSheet from '../ui/BottomSheet';

export default function AddContactModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in name and phone');
      return;
    }
    onAdd({ name, phone, email, priority: Number(priority) });
    setName('');
    setPhone('');
    setEmail('');
    setPriority(0);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPriority(0);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <h3 style={{ marginBottom: '15px', color: '#1e3c72' }}>
        👤 Add Trusted Contact
      </h3>
      
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name *" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Phone *" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
          required 
          type="tel"
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          type="email"
        />
        <select 
          value={priority} 
          onChange={e => setPriority(e.target.value)}
          style={{ margin: '8px 0' }}
        >
          <option value="0">Low Priority</option>
          <option value="1">High Priority</option>
        </select>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="button"
            onClick={handleClose}
            style={{ 
              flex: 1,
              padding: '12px', 
              background: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          
          <button 
            type="submit"
            style={{ 
              flex: 1,
              padding: '12px', 
              background: '#2a9d8f', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add Contact
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}