import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import PopupFormComponent from "../../components/PopupFormComponent/PopupFormComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import useApi from "../../hooks/useApi.js";
import "./MainPage.scss";

function MainPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error, data, get, post, put, del } = useApi();
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
  }
  return (
    <>
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={isEditing ? "Редактировать запись" : "Добавить запись"}
      >
        <PopupFormComponent
          onCancel={handleClosePopup}
          onSubmit={post}
          onEditing={put}
          initialData={initialData}
          editing={isEditing}
        />
      </PopupComponent>
      {loading ? (
        "Загрузка ..."
      ) : (
        <>
          {" "}
          <TableComponent
            data={data}
            deleteFunc={del}
            setForm={handleSetForm}
          />{" "}
          <ButtonComponent variant="primary" onClick={handleOpenPopup}>
            Добавить строчку
          </ButtonComponent>
        </>
      )}
      {error ? "Ошибка загрузки" : null}
    </>
  );
}
export default MainPage;
