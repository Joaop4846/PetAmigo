import './Header.css';


export default function Header({ title, subtitle, children }) {
  return (
    <header className="header">
      <div className="header__info">
        <h2 className="header__title">{title}</h2>
        {subtitle && <p className="header__subtitle">{subtitle}</p>}
      </div>
      {children && <div className="header__actions">{children}</div>}
    </header>
  );
}
