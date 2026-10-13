import { useState } from 'react';
import api from '../api/axiosConfig';

export const HabitacionForm = ({ onHabitacionRegistrada }) => {
  const [form, setForm] = useState({ tipoHabitacion: 'Simple', numeroHabitacion: '', precio: '' });
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    try {
      await api.post('/habitaciones', form);
      setMensaje({ type: 'success', text: `Habitación ${form.numeroHabitacion} registrada con éxito.` });
      setForm({ tipoHabitacion: 'Simple', numeroHabitacion: '', precio: '' });
      onHabitacionRegistrada();
    } catch (err) {
      setMensaje({ type: 'error', text: err.response?.data?.error || 'Error al registrar habitación.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Número de Habitación:</label>
        <input 
          type="text" 
          value={form.numeroHabitacion} 
          onChange={(e) => setForm({ ...form, numeroHabitacion: e.target.value })} 
          placeholder="Ej: 301"
          required 
        />
      </div>
      <div className="form-group">
        <label>Tipo:</label>
        <select value={form.tipoHabitacion} onChange={(e) => setForm({ ...form, tipoHabitacion: e.target.value })}>
          <option value="Simple">Simple</option>
          <option value="Doble">Doble</option>
          <option value="Matrimonial">Matrimonial</option>
          <option value="Suite Executiva">Suite Executiva</option>
          <option value="Suite Presidencial">Suite Presidencial</option>
        </select>
      </div>
      <div className="form-group">
        <label>Precio por Noche (soles):</label>
        <input 
          type="number" 
          step="0.01"
          value={form.precio} 
          onChange={(e) => setForm({ ...form, precio: e.target.value })} 
          placeholder="Ej: 75.00"
          required 
        />
      </div>
      <button type="submit" className="btn-primary">Registrar Habitación</button>
      {mensaje && <div className={`response-box ${mensaje.type}`}>{mensaje.text}</div>}
    </form>
  );
};