import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import SearchComponent from "../../components/SearchComponent/SearchComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import useApi from "../../hooks/useApi.js";
import usePopup from "../../hooks/usePopup/usePopup.js";
import "./MainPage.scss";

function MainPage() {
  // Главная задача отображать все элементы
  const [isSearchData, setIsSearchData] = useState(null);
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [isFilters, setIsFilters] = useState({
    month: String(new Date().getMonth() + 1).padStart(2, "0"),
    year: new Date().getFullYear(),
  });

  const { loading, error, data, get, post, patch, del } = useApi();
  const {
    isPopupOpen,
    setIsPopupOpen,
    ClosePopup,
    title,
    setTitle,
    popupView,
    setPopupView,
  } = usePopup();
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    handleFilterData(isFilters);
  }, [data, isFilters]);
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
  function handleFilterData(isFilters) {
    const { month, year } = isFilters;
    let filtered;
    if (month && year) {
      filtered = data
        .filter((item) => {
          const yearItem = item.invoiceDate.slice(0, 4);
          return yearItem == year;
        })
        .filter((item) => {
          const monthItem = item.invoiceDate.slice(5, 7);
          return monthItem == month;
        });
    } else if (!month && !year) {
      filtered = data;
    } else if (!month) {
      filtered = data.filter((item) => {
        const yearItem = item.invoiceDate.slice(0, 4);
        return yearItem == year;
      });
    } else if (!year) {
      filtered = data.filter((item) => {
        const monthItem = item.invoiceDate.slice(5, 7);
        return monthItem == month;
      });
    }
    setFilteredData(filtered);
    handleClosePopup();
  }

  return (
    <>
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={ClosePopup}
        title={title}
        popupView={popupView}
      />
      {/* <PopupComponent
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
      </PopupComponent> */}
      <header className="header">
        <div className="header__content">
          <FilterComponent isFilters={isFilters} />
          <ButtonComponent
            variant="danger"
            size="medium"
            onClick={() => {
              setIsFilters((prev) => {
                return { ...prev, month: "", year: "" };
              });
            }}
          >
            Удалить фильтры
          </ButtonComponent>
          <SearchComponent setIsSearchData={setIsSearchData} />
        </div>
      </header>
      {loading ? (
        "Загрузка ..."
      ) : (
        <>
          {" "}
          <TableComponent
            data={isSearchData || filteredData || data}
            deleteFunc={del}
            setForm={handleSetForm}
            setPopupView={setPopupView}
          />{" "}
          <ButtonComponent
            variant="primary"
            onClick={() => {
              setIsPopupOpen(true);
              setPopupView("form");
              setTitle("Форма нового счета");
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
