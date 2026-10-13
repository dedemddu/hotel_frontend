import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import { Header } from './components/Header';
import { HabitacionesList } from './components/HabitacionesList';
import { ClienteForm } from './components/ClienteForm';
import { HabitacionForm } from './components/HabitacionForm';
import { ReservacionForm } from './components/ReservacionForm';
import { ReservacionesList } from './components/ReservacionesList';

export default function App() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [habitaciones, setHabitaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabitaciones = async () => {
    try {
      const res = await api.get('/habitaciones');
      setHabitaciones(res.data);
    } catch (err) {
      console.error('Error al cargar habitaciones:', err);
    }
  };

  const fetchClientes = async () => {
    try {
      const res = await api.get('/clientes');
      setClientes(res.data);
    } catch (err) {
      console.error('Error al cargar clientes:', err);
    }
  };

  const fetchReservaciones = async () => {
    try {
      const res = await api.get('/reservaciones');
      setReservaciones(res.data);
    } catch (err) {
      console.error('Error al cargar reservaciones:', err);
    }
  };

  const loadData = async () => {
    await Promise.all([fetchHabitaciones(), fetchClientes(), fetchReservaciones()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    // Polling cada 3 segundos
    const interval = setInterval(() => {
      fetchHabitaciones();
      fetchClientes();
      fetchReservaciones();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'reservas' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservas')}
        >
          📋 Realizar Reserva
        </button>
        <button 
          className={`tab-button ${activeTab === 'anular' ? 'active' : ''}`}
          onClick={() => setActiveTab('anular')}
        >
          ❌ Anular Reservas
        </button>
        <button 
          className={`tab-button ${activeTab === 'clientes' ? 'active' : ''}`}
          onClick={() => setActiveTab('clientes')}
        >
          👤 Registrar Cliente
        </button>
        <button 
          className={`tab-button ${activeTab === 'habitaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('habitaciones')}
        >
          🏨 Registrar Habitación
        </button>
        <button 
          className={`tab-button ${activeTab === 'estado' ? 'active' : ''}`}
          onClick={() => setActiveTab('estado')}
        >
          🛏️ Estado de Habitaciones
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'reservas' && (
          <section className="section-card">
            <h2>Realizar Nueva Reserva</h2>
            <ReservacionForm 
              habitaciones={habitaciones} 
              clientes={clientes} 
              onReservaExitosa={loadData} 
            />
          </section>
        )}

        {activeTab === 'anular' && (
          <section className="section-card">
            <h2>Reservaciones Activas (Anulación)</h2>
            <ReservacionesList 
              reservaciones={reservaciones} 
              onReservaAnulada={loadData} 
            />
          </section>
        )}

        {activeTab === 'clientes' && (
          <section className="section-card">
            <h2>Gestión de Clientes</h2>
            <ClienteForm onClienteRegistrado={fetchClientes} />
          </section>
        )}

        {activeTab === 'habitaciones' && (
          <section className="section-card">
            <h2>Gestión de Habitaciones</h2>
            <HabitacionForm onHabitacionRegistrada={fetchHabitaciones} />
          </section>
        )}

        {activeTab === 'estado' && (
          <section className="section-card">
            <h2>Estado y Disponibilidad de Habitaciones</h2>
            <HabitacionesList habitaciones={habitaciones} loading={loading} />
          </section>
        )}
      </div>
    </div>
  );
}