import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import PopupFilterComponent from "../../components/PopupFilterComponent/PopupFilterComponent.jsx";
import PopupFormComponent from "../../components/PopupFormComponent/PopupFormComponent.jsx";
import SearchComponent from "../../components/SearchComponent/SearchComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import useApi from "../../hooks/useApi.js";
import "./MainPage.scss";

function MainPage() {
  const [filterParams] = useSearchParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [popupView, setPopupView] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const { loading, error, data, get, post, patch, del } = useApi();
  useEffect(() => {
    get();
  }, []);
  function handleSetForm(id) {
    const findData = data.find((item) => {
      return item.id == id;
    });
    setInitialData(findData);
    setIsEditing(true);
    setIsPopupOpen(true);
  }
  function handleOpenPopup() {
    setIsPopupOpen(true);
  }
  function handleClosePopup() {
    setIsEditing(false);
    setIsPopupOpen(false);
    setInitialData({});
    setPopupView(null);
  }

  return (
    <>
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={isEditing ? "Редактировать запись" : "Добавить запись"}
      >
        {popupView === "form" ? (
          <PopupFormComponent
            onCancel={handleClosePopup}
            onSubmit={post}
            onEditing={patch}
            initialData={initialData}
            editing={isEditing}
          />
        ) : popupView === "filter" ? (
          <PopupFilterComponent
            onCancel={handleClosePopup}
            setFilteredData={setFilteredData}
          />
        ) : null}
      </PopupComponent>
      <header className="header">
        <div className="header__content">
          <div className="filter">
            <ButtonComponent
              variant="secondary"
              size="medium"
              onClick={() => {
                setPopupView("filter");
                setIsPopupOpen(true);
              }}
            >
              Фильтр
            </ButtonComponent>
            <div className="filter__info">
              <div className="filter__item">Месяц:{filterParams.get("fm")}</div>
              <div className="filter__item">Год:{filterParams.get("fy")}</div>
            </div>
          </div>
          <SearchComponent
            data={data}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        </div>
      </header>
      {loading ? (
        "Загрузка ..."
      ) : (
        <>
          {" "}
          <TableComponent
            data={filteredData || data}
            deleteFunc={del}
            setForm={handleSetForm}
            setPopupView={setPopupView}
          />{" "}
          <ButtonComponent
            variant="primary"
            onClick={(e) => {
              setPopupView("form");
              handleOpenPopup(e);
            }}
          >
            Добавить строчку
          </ButtonComponent>
        </>
      )}
      {error ? "Ошибка загрузки" : null}
    </>
  );
}
export default MainPage;
