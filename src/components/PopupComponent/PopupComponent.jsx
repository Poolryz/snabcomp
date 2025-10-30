import PopupFilterComponent from "../PopupFilterComponent/PopupFilterComponent";
import PopupFormComponent from "../PopupFormComponent/PopupFormComponent";
import "./PopupComponent.scss";
function PopupComponent({ isOpen, onClose, title, popupView }) {
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

        <div className="popup__body">
          {popupView === "form" ? (
            <PopupFormComponent
              onCancel={onClose}
              // onSubmit={post}
              // onEditing={patch}
              // initialData={initialData}
              // editing={isEditing}
            />
          ) : popupView === "filter" ? (
            <PopupFilterComponent
            // onCancel={handleClosePopup}
            // onFilter={handleFilterData}
            // isFilters={isFilters}
            // setIsFilters={setIsFilters}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default PopupComponent;
