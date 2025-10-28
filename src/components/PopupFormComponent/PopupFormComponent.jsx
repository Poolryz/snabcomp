import { useEffect, useState } from "react";
import "./PopupFormComponent.scss";

function PopupFormComponent({
  onSubmit,
  onCancel,
  onEditing,
  initialData,
  editing,
}) {
  const [inputData, setInputData] = useState(
    initialData || {
      invoiceDate: "",
      organization: "",
      invoiceNumber: "",
      amount: "",
      paymentDate: "",
      responsible: "",
      note: "",
      invoicePdf: null,
      paymentPdf: null,
    }
  );

  const [currentInvoiceFile, setCurrentInvoiceFile] = useState(null);
  const [currentPaymentFile, setCurrentPaymentFile] = useState(null);
  const [newInvoiceFile, setNewInvoiceFile] = useState(null);
  const [newPaymentFile, setNewPaymentFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setInputData(initialData);
      // Сохраняем информацию о текущих файлах для отображения
      if (initialData.invoicePdfName) {
        setCurrentInvoiceFile(initialData.invoicePdfName);
      }
      if (initialData.paymentPdfName) {
        setCurrentPaymentFile(initialData.paymentPdfName);
      }
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "invoicePdf" || name === "paymentPdf") {
      const file = files[0] || null;

      setInputData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Обновляем отображение выбранного файла
      if (file) {
        if (name === "invoicePdf") {
          setNewInvoiceFile(file.name);
        } else {
          setNewPaymentFile(file.name);
        }
      } else {
        // Если файл удален
        if (name === "invoicePdf") {
          setNewInvoiceFile(null);
        } else {
          setNewPaymentFile(null);
        }
      }
    } else {
      setInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleRemoveFile(fileType) {
    if (fileType === "invoicePdf") {
      setInputData((prev) => ({ ...prev, invoicePdf: null }));
      setNewInvoiceFile(null);
      // Очищаем input file
      const fileInput = document.querySelector('input[name="invoicePdf"]');
      if (fileInput) fileInput.value = "";
    } else if (fileType === "paymentPdf") {
      setInputData((prev) => ({ ...prev, paymentPdf: null }));
      setNewPaymentFile(null);
      const fileInput = document.querySelector('input[name="paymentPdf"]');
      if (fileInput) fileInput.value = "";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Отладочная информация
    console.log("inputData перед отправкой:", inputData);

    // Для PATCH запроса отправляем только измененные поля
    Object.keys(inputData).forEach((key) => {
      // Пропускаем поля, которые не должны отправляться в FormData
      if (
        key === "id" ||
        key === "invoicePdfUrl" ||
        key === "paymentPdfUrl" ||
        key === "invoicePdfName" ||
        key === "paymentPdfName"
      ) {
        return;
      }

      if (
        inputData[key] !== null &&
        inputData[key] !== undefined &&
        inputData[key] !== ""
      ) {
        if (key === "invoicePdf" || key === "paymentPdf") {
          if (inputData[key] instanceof File) {
            formData.append(key, inputData[key]);
            console.log(`Добавлен файл ${key}:`, inputData[key].name);
          }
        } else {
          formData.append(key, inputData[key]);
          console.log(`Добавлено поле ${key}:`, inputData[key]);
        }
      }
    });

    // Для PATCH запросов важно отправлять ID
    if (editing && inputData.id) {
      formData.append("id", inputData.id);
    }

    // Проверим что в FormData
    console.log("FormData содержимое:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`FormData: ${key} = File(${value.name})`);
      } else {
        console.log(`FormData: ${key} =`, value);
      }
    }

    if (editing) {
      onEditing(inputData.id, formData);
    } else {
      onSubmit(formData);
    }

    onCancel();
  };

  return (
    <form
      className="popup-form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
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
              value={inputData.invoiceDate || ""}
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
              value={inputData.organization || ""}
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
              value={inputData.invoiceNumber || ""}
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
              value={inputData.amount || ""}
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
              value={inputData.paymentDate || ""}
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
              value={inputData.responsible || ""}
            />
          </div>
        </div>

        <div className="popup-form__row">
          <div className="popup-form__field">
            <label className="popup-form__label">Загрузить счет</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              accept=".pdf"
              className="popup-form__input"
              type="file"
              name="invoicePdf"
            />
            {/* Показываем текущий файл если он есть и не выбран новый */}
            {currentInvoiceFile && !newInvoiceFile && (
              <div className="file-info">
                <span>Текущий файл: {currentInvoiceFile}</span>
              </div>
            )}
            {/* Показываем новый выбранный файл */}
            {newInvoiceFile && (
              <div className="file-info">
                <span>Новый файл: {newInvoiceFile}</span>
                <button
                  type="button"
                  className="file-remove"
                  onClick={() => handleRemoveFile("invoicePdf")}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="popup-form__field">
            <label className="popup-form__label">Загрузить платежку</label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              accept=".pdf"
              className="popup-form__input"
              type="file"
              name="paymentPdf"
            />
            {/* Показываем текущий файл если он есть и не выбран новый */}
            {currentPaymentFile && !newPaymentFile && (
              <div className="file-info">
                <span>Текущий файл: {currentPaymentFile}</span>
              </div>
            )}
            {/* Показываем новый выбранный файл */}
            {newPaymentFile && (
              <div className="file-info">
                <span>Новый файл: {newPaymentFile}</span>
                <button
                  type="button"
                  className="file-remove"
                  onClick={() => handleRemoveFile("paymentPdf")}
                >
                  ×
                </button>
              </div>
            )}
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
            value={inputData.note || ""}
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
          {editing ? "Обновить" : "Создать"}
        </button>
      </div>
    </form>
  );
}

export default PopupFormComponent;
