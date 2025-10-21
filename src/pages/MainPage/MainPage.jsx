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
    setActualData(featchdata);
  }, []);
  const featchdata = [
    {
      id: 1,
      invoiceDate: "2024-01-15",
      organization: 'ООО "Ромашка"',
      invoiceNumber: "INV-001",
      amount: "15 000 ₽",
      paymentDate: "2024-01-20",
      responsible: "Иванов И.И.",
      note: "Оплата за услуги",
    },
    {
      id: 2,
      invoiceDate: "2024-01-16",
      organization: 'АО "Луч"',
      invoiceNumber: "INV-002",
      amount: "25 500 ₽",
      paymentDate: "2024-01-25",
      responsible: "Петров П.П.",
      note: "Предоплата 50%",
    },
  ];
  function handleOpenPopup() {
    setIsPopupOpen(true);
  }
  function handleClosePopup() {
    setIsPopupOpen(false);
  }
  function handlerSubmitForm(data) {
    data.id = 3;
    setActualData((prev) => {
      return [...prev, data];
    });
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
