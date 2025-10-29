import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import PopupFilterComponent from "../../components/PopupFilterComponent/PopupFilterComponent.jsx";
import PopupFormComponent from "../../components/PopupFormComponent/PopupFormComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import useApi from "../../hooks/useApi.js";
import "./MainPage.scss";

function MainPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [popupView, setPopupView] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isFilters, setIsFilters] = useState({ month: "", year: "2025" });

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
  function handleFilterData(filters) {
    const { month, year } = filters;
    const filtered = data
      .filter((item) => {
        const monthItem = item.invoiceDate.slice(5, 7);

        return monthItem == month;
      })
      .filter((item) => {
        const yearItem = item.invoiceDate.slice(0, 4);
        return yearItem == year;
      });
    setFilteredData(filtered);
    handleClosePopup();
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
            onFilter={handleFilterData}
            isFilters={isFilters}
            setIsFilters={setIsFilters}
          />
        ) : null}
      </PopupComponent>
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
