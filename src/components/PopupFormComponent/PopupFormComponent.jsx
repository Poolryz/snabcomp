import "./PopupFormComponent.scss";
function PopupFormComponent({ onSubmit, onCancel, initialData = {} }) {
  return (
    <form className="popup-form" onSubmit={onSubmit}>
      <div className="popup-form__content">
        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">Дата счета *</label>
            <input
              className="popup-form__input"
              type="date"
              name="invoiceDate"
              defaultValue={initialData.invoiceDate}
              required
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Организация *</label>
            <input
              className="popup-form__input"
              type="text"
              name="organization"
              defaultValue={initialData.organization}
              placeholder="Введите название организации"
              required
            />
          </div>
        </div>

        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">№ счета *</label>
            <input
              className="popup-form__input"
              type="text"
              name="invoiceNumber"
              defaultValue={initialData.invoiceNumber}
              placeholder="Например: INV-001"
              required
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Сумма *</label>
            <input
              className="popup-form__input"
              type="text"
              name="amount"
              defaultValue={initialData.amount}
              placeholder="Например: 15 000 ₽"
              required
            />
          </div>
        </div>

        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">Дата оплаты</label>
            <input
              className="popup-form__input"
              type="date"
              name="paymentDate"
              defaultValue={initialData.paymentDate}
            />
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Ответственный *</label>
            <input
              className="popup-form__input"
              type="text"
              name="responsible"
              defaultValue={initialData.responsible}
              placeholder="ФИО ответственного"
              required
            />
          </div>
        </div>

        <div className="popup-form__field">
          <label className="popup-form__label">Примечание</label>
          <textarea
            className="popup-form__textarea"
            name="note"
            defaultValue={initialData.note}
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
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default PopupFormComponent;
