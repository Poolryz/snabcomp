import { useState } from "react";
import "./PopupFormComponent.scss";
function PopupFormComponent({ onSubmit, onCancel }) {
  const [inputData, setInputData] = useState({
    invoiceDate: "",
    organization: "",
    invoiceNumber: "",
    amount: "",
    paymentDate: "",
    responsible: "",
    note: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputData);
    setInputData({
      invoiceDate: "",
      organization: "",
      invoiceNumber: "",
      amount: "",
      paymentDate: "",
      responsible: "",
      note: "",
    });
  };
  return (
    <form className="popup-form">
      <div className="popup-form__content">
        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">Дата счета</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="date"
              name="invoiceDate"
              value={inputData.invoiceDate}
              required
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Организация </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="text"
              name="organization"
              placeholder="Введите название организации"
              value={inputData.organization}
              required
            />
          </div>
        </div>

        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">№ счета </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="text"
              name="invoiceNumber"
              placeholder="Например: INV-001"
              value={inputData.invoiceNumber}
              required
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Сумма </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="text"
              name="amount"
              placeholder="Например: 15 000 ₽"
              value={inputData.amount}
              required
            />
          </div>
        </div>

        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">Дата оплаты</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="date"
              name="paymentDate"
              value={inputData.paymentDate}
              required
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Ответственный </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              className="popup-form__input"
              type="text"
              name="responsible"
              placeholder="ФИО ответственного"
              value={inputData.responsible}
              required
            />
          </div>
        </div>

        <div className="popup-form__field">
          <label className="popup-form__label">Примечание</label>
          <textarea
            onChange={(e) => {
              handleChange(e);
            }}
            className="popup-form__textarea"
            name="note"
            placeholder="Дополнительная информация"
            value={inputData.note}
            rows="3"
          />
        </div>
      </div>

      <div className="popup-form__footer">
        <button
          className="popup-form__button popup-form__button--cancel"
          type="button"
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          className="popup-form__button popup-form__button--submit"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default PopupFormComponent;
