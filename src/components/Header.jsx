import logoUna from '../assets/UNA-Puno.jpg';

export const Header = () => {
  return (
    <header className="main-header">
      <img 
        src={logoUna} 
        alt="Universidad Nacional del Altiplano " 
        className="header-logo" 
      />
     
      <h1>Sistema de Reservas de Hotel - Prueba con Microsoft Azure</h1>
    </header>
  );
};