import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled, className = '', title }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
