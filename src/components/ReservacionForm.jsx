import { useState } from 'react';
import api from '../api/axiosConfig';

export const ReservacionForm = ({ habitaciones, clientes, onReservaExitosa }) => {
  const [idCliente, setIdCliente] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [idHabitacion, setIdHabitacion] = useState('');
  const [noches, setNoches] = useState(1);
  const [mensaje, setMensaje] = useState(null);

  const disponibles = habitaciones.filter(h => h.disponibilidad);

  const clientesFiltrados = clientes.filter(c => 
    `${c.nombres} ${c.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!idCliente) {
      setMensaje({ type: 'error', text: 'Debe seleccionar un cliente de la lista.' });
      return;
    }

    try {
      const res = await api.post('/reservaciones', { idCliente, idHabitacion, noches });
      setMensaje({ 
        type: 'success', 
        text: `¡Reserva #${res.data.reservacion.idReservacion} exitosa! Total: S/${res.data.reservacion.precioTotal} soles` 
      });
      setIdHabitacion('');
      setNoches(1);
      onReservaExitosa();
    } catch (err) {
      setMensaje({ 
        type: 'error', 
        text: err.response?.data?.error || 'Error al procesar la reserva.' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Buscador de Cliente */}
      <div className="form-group">
        <label>Buscar Cliente:</label>
        <input 
          type="text" 
          placeholder="Escriba el nombre o apellido del cliente..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Seleccionar Cliente Encontrado:</label>
        <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
          <option value="">-- Seleccionar Cliente --</option>
          {clientesFiltrados.map(c => (
            <option key={c.idCliente} value={c.idCliente}>
              ID {c.idCliente}: {c.nombres} {c.apellidos}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Seleccionar Habitación Disponible:</label>
        <select value={idHabitacion} onChange={(e) => setIdHabitacion(e.target.value)} required>
          <option value="">-- Seleccionar Habitación --</option>
          {disponibles.map(h => (
            <option key={h.idHabitacion} value={h.idHabitacion}>
              Hab. {h.numeroHabitacion} ({h.tipoHabitacion} - S/.{h.precio}/noche)
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Número de Noches:</label>
        <input 
          type="number" 
          min="1" 
          value={noches} 
          onChange={(e) => setNoches(e.target.value)} 
          required 
        />
      </div>

      <button type="submit" className="btn-primary">Confirmar Reserva</button>

      {mensaje && <div className={`response-box ${mensaje.type}`}>{mensaje.text}</div>}
    </form>
  );
};