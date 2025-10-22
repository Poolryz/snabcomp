import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PopupComponent from "../../components/PopupComponent/PopupComponent.jsx";
import PopupFormComponent from "../../components/PopupFormComponent/PopupFormComponent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import "./MainPage.scss";

function MainPage() {
  const [actualData, setActualData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    handleGetData();
  }, []);
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
  function handlerSubmitForm(data) {
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

  function handleOpenPopup() {
    setIsPopupOpen(true);
  }
  function handleClosePopup() {
    setIsPopupOpen(false);
  }
  return (
    <>
      <PopupComponent isOpen={isPopupOpen} onClose={handleClosePopup}>
        <PopupFormComponent
          onCancel={handleClosePopup}
          onSubmit={handlerSubmitForm}
        />
      </PopupComponent>
      <TableComponent data={actualData} />
      <ButtonComponent onClick={handleOpenPopup}>
        Добавить строчку
      </ButtonComponent>
    </>
  );
}
export default MainPage;
