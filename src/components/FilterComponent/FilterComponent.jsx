import usePopup from "../../hooks/usePopup/usePopup.js";
import ButtonComponent from "../ButtonComponent/ButtonComponent.jsx";
import PopupComponent from "../PopupComponent/PopupComponent.jsx";
function FilterComponent({ isFilters }) {
  const {
    isPopupOpen,
    setIsPopupOpen,
    ClosePopup,
    title,
    setTitle,
    popupView,
    setPopupView,
  } = usePopup();
  return (
    <>
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={ClosePopup}
        title={title}
        popupView={popupView}
      />
      <ButtonComponent
        variant="secondary"
        size="medium"
        onClick={() => {
          setPopupView("filter");
          setIsPopupOpen(true);
          setTitle("Фильтры");
        }}
      >
        Фильтр
      </ButtonComponent>

      <div className="filter">
        <div className="filter__info">
          <div className="filter__item">Месяц: {isFilters.month}</div>
          <div className="filter__item">Год: {isFilters.year}</div>
        </div>
      </div>
    </>
  );
}
export default FilterComponent;
