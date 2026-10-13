import { useState } from 'react';
import api from '../api/axiosConfig';

export const ClienteForm = ({ onClienteRegistrado }) => {
  const [form, setForm] = useState({ nombres: '', apellidos: '' });
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    try {
      const res = await api.post('/clientes', form);
      setMensaje({ type: 'success', text: `Cliente registrado: ${res.data.cliente.nombres} ${res.data.cliente.apellidos}` });
      setForm({ nombres: '', apellidos: '' });
      onClienteRegistrado();
    } catch (err) {
      setMensaje({ type: 'error', text: err.response?.data?.error || 'Error al registrar cliente.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Nombres:</label>
        <input 
          type="text" 
          value={form.nombres} 
          onChange={(e) => setForm({ ...form, nombres: e.target.value })} 
          placeholder="Ej: Carlos"
          required 
        />
      </div>
      <div className="form-group">
        <label>Apellidos:</label>
        <input 
          type="text" 
          value={form.apellidos} 
          onChange={(e) => setForm({ ...form, apellidos: e.target.value })} 
          placeholder="Ej: Mendoza"
          required 
        />
      </div>
      <button type="submit" className="btn-primary">Registrar Cliente</button>
      {mensaje && <div className={`response-box ${mensaje.type}`}>{mensaje.text}</div>}
    </form>
  );
};