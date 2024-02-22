import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Input({ type, name, label, icon }) {
  return (
    <div className="input-container">
      <span className="icon-container">
        <FontAwesomeIcon icon={icon} className="icon" />
      </span>
      <input type={type} name={name} placeholder=" " required />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
