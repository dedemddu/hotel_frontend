import { useState } from 'react';
import api from '../api/axiosConfig';

export const ReservacionesList = ({ reservaciones, onReservaAnulada }) => {
  const [mensaje, setMensaje] = useState(null);

  const handleAnular = async (idReservacion) => {
    if (!window.confirm(`¿Está seguro de anular la reservación #${idReservacion}?`)) {
      return;
    }

    try {
      // Uso del verbo DELETE en la API REST
      const res = await api.delete(`/reservaciones/${idReservacion}`);
      setMensaje({ type: 'success', text: res.data.message });
      onReservaAnulada(); 
    } catch (err) {
      setMensaje({ 
        type: 'error', 
        text: err.response?.data?.error || 'Error al anular la reservación.' 
      });
    }
  };

  if (reservaciones.length === 0) {
    return <p>No hay reservaciones registradas activas.</p>;
  }

  return (
    <div>
      {mensaje && <div className={`response-box ${mensaje.type}`}>{mensaje.text}</div>}
      <table className="custom-table" style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Cliente</th>
            <th style={{ padding: '10px' }}>Habitación</th>
            <th style={{ padding: '10px' }}>Noches</th>
            <th style={{ padding: '10px' }}>Total</th>
            <th style={{ padding: '10px' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservaciones.map((r) => (
            <tr key={r.idReservacion} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px' }}>#{r.idReservacion}</td>
              <td style={{ padding: '10px' }}>{r.nombreCliente}</td>
              <td style={{ padding: '10px' }}>Hab. {r.numeroHabitacion}</td>
              <td style={{ padding: '10px' }}>{r.noches}</td>
              <td style={{ padding: '10px' }}>S/.{r.precioTotal} soles</td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => handleAnular(r.idReservacion)}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Anular
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};