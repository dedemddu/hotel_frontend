
const BED_ICON = (
  <svg className="icon-bed" width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
    <path d="M19 7h-8v8H3V5H1v15h2v-3h18v3h2v-9a4 4 0 0 0-4-4zm-2 6h-6V9h6a2 2 0 0 1 2 2v2zM7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
);

export const HabitacionesList = ({ habitaciones, loading }) => {
  if (loading) return <p>Cargando habitaciones desde PostgreSQL...</p>;

  return (
    <div className="habitaciones-grid">
      {habitaciones.map((h) => (
        <div 
          key={h.idHabitacion} 
          className={`habitacion-card ${h.disponibilidad ? 'disponible' : 'ocupada'}`}
        >
          <div className="card-header">
            <div className="header-title">
              {BED_ICON}
              <h3>Habitación {h.numeroHabitacion}</h3>
            </div>
            <span className={`badge ${h.disponibilidad ? 'badge-success' : 'badge-danger'}`}>
              {h.disponibilidad ? 'Disponible' : 'Ocupada'}
            </span>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="label">Tipo:</span>
              <span className="value">{h.tipoHabitacion}</span>
            </div>
            <div className="info-row price-row">
              <span className="label">Precio/Noche:</span>
              <span className="price-value">S/.{h.precio} <small></small></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};