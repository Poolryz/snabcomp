import "./ButtonComponent.scss";
function ButtonComponent({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
}) {
  return (
    <button
      className={`
        button
        button--${variant}
        button--${size}
        ${disabled ? "button--disabled" : ""}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="button__text">{children}</span>
    </button>
  );
}
export default ButtonComponent;
