import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import PopupFormComponent from "../../components/PopupFormComponent/PopupFormComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import "./MainPage.scss";

function MainPage() {
  const [actualData, setActualData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    handleGetData();
  }, []);
  function handleSetForm(id) {
    const data = actualData.find((item) => {
      return item.id == id;
    });

    setInitialData(data);
    setIsEditing(true);
    setIsPopupOpen(true);
  }
  function handleDeleteItem(id) {
    fetch(`http://localhost:3000/api/invoices/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        return handleGetData();
      })
      .catch((error) => console.log(error));
  }
  function handleGetData() {
    fetch("http://localhost:3000/api/invoices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return setActualData(data);
      })
      .catch((error) => console.log(error.message));
  }
  function handleSubmitForm(data) {
    fetch("http://localhost:3000/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleGetData();
        return res.json();
      })
      .catch((error) => console.error(error));
  }
  function handleEditingItem(id, data) {
    fetch(`http://localhost:3000/api/invoices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => handleGetData());
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
          onSubmit={handleSubmitForm}
          onEditing={handleEditingItem}
          initialData={initialData}
          editing={isEditing}
        />
      </PopupComponent>
      <TableComponent
        data={actualData}
        deleteFunc={handleDeleteItem}
        setForm={handleSetForm}
      />
      <ButtonComponent variant="primary" onClick={handleOpenPopup}>
        Добавить строчку
      </ButtonComponent>
    </>
  );
}
export default MainPage;
