import "./PopupComponent.scss";
function PopupComponent({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;
  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__content">
        <div className="popup__header">
          <h2 className="popup__title">{title}</h2>
          <button className="popup__close" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className="popup__body">{children}</div>
      </div>
    </div>
  );
}
export default PopupComponent;
