import { useState } from "react";
import "./PopupFormComponent.scss";
function PopupFormComponent({ onSubmit, onCancel }) {
  const [inputData, setInputData] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputData);
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
