import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Input({
  type,
  name,
  label,
  minLength,
  maxLength,
  pattern,
  title,
  icon,
}) {
  return (
    <div className="input-container">
      <span className="icon-container">
        <FontAwesomeIcon icon={icon} className="icon" />
      </span>
      <input
        type={type}
        name={name}
        placeholder=" "
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        autoComplete="off"
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
