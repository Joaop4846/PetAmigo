import './Input.css';

export default function Input({ label, error, id, ...props }) {
  return (
    <div className={`input-group ${error ? 'input-group--error' : ''}`}>
      {label && <label htmlFor={id} className="input-group__label">{label}</label>}
      <input id={id} className="input-group__field" {...props} />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}
