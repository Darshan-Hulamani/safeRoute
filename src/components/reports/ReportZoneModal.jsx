import React, { useState } from 'react';
import BottomSheet from '../ui/BottomSheet';
import toast from 'react-hot-toast';
import { useReports } from '../../hooks/useReports';

export default function ReportZoneModal({ isOpen, onClose, position }) {
  const [type, setType] = useState('assault');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addReport } = useReports();

  const submit = async (e) => {
    e.preventDefault();
    if (!position) {
      toast.error('No location selected');
      return;
    }
    setSubmitting(true);
    try {
      const newReport = await addReport({
        latitude: position.lat,
        longitude: position.lng,
        type,
        description: description || `Unsafe zone - ${type}`,
        user_id: 'guest_user',
      });
      console.log('Report saved:', newReport);
      toast.success('🚨 Danger zone reported!');
      setDescription('');
      setType('assault');
      onClose();
    } catch (error) {
      console.error('Report error:', error);
      toast.error('Failed to report zone');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setDescription('');
      setType('assault');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <h3 style={{ marginBottom: 15, color: '#1e3c72' }}>⚠️ Report Unsafe Zone</h3>
      <p style={{ fontSize: 14, color: '#6c757d', marginBottom: 15 }}>
        📍 Location: {position ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : 'Not selected'}
      </p>
      <form onSubmit={submit}>
        <label style={{ display: 'block', marginBottom: 15 }}>
          <strong>Danger Type:</strong>
          <select value={type} onChange={e => setType(e.target.value)} disabled={submitting}
            style={{ width: '100%', padding: 12, marginTop: 5, border: '1px solid #dee2e6', borderRadius: 8, fontSize: 14 }}>
            <option value="assault">🗡️ Assault</option>
            <option value="theft">💰 Theft</option>
            <option value="harassment">😠 Harassment</option>
            <option value="poor_lighting">💡 Poor Lighting</option>
            <option value="other">📌 Other</option>
          </select>
        </label>
        <label style={{ display: 'block', marginBottom: 15 }}>
          <strong>Description (optional):</strong>
          <textarea
            placeholder="Describe what makes this area unsafe..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={submitting}
            style={{ width: '100%', padding: 12, marginTop: 5, border: '1px solid #dee2e6', borderRadius: 8, minHeight: 80, fontSize: 14 }}
          />
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={handleClose} disabled={submitting}
            style={{ flex: 1, padding: 12, background: '#6c757d', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: submitting ? 'not-allowed' : 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={submitting}
            style={{ flex: 2, padding: 12, background: '#e63946', color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: submitting ? 'not-allowed' : 'pointer' }}>
            {submitting ? '⏳ Reporting...' : '🚨 Report Danger Zone'}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}