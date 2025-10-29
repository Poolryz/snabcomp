import { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent.jsx";
import "./PopupFilterComponent.scss";

function PopupFilterComponent({ onCancel, onFilter }) {
  const [filters, setFilters] = useState({ month: "", year: "2025" });
  function handleChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const months = [
    { value: "01", label: "Январь" },
    { value: "03", label: "Март" },
    { value: "02", label: "Февраль" },
    { value: "04", label: "Апрель" },
    { value: "05", label: "Май" },
    { value: "06", label: "Июнь" },
    { value: "07", label: "Июль" },
    { value: "08", label: "Август" },
    { value: "09", label: "Сентябрь" },
    { value: "10", label: "Октябрь" },
    { value: "11", label: "Ноябрь" },
    { value: "12", label: "Декабрь" },
  ];

  // Генерируем годы (например, от 2020 до 2030)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="date-filter-popup">
      <div className="date-filter__content">
        <div className="date-filter__header">
          <h3 className="date-filter__title">Фильтр по дате</h3>
        </div>

        <div className="date-filter__body">
          <div className="date-filter__row">
            <div className="date-filter__field">
              <label className="date-filter__label">Месяц</label>
              <select
                className="date-filter__select"
                value={filters.month}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="month"
              >
                <option value="">Выберите месяц</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="date-filter__field">
              <label className="date-filter__label">Год</label>
              <select
                className="date-filter__select"
                value={filters.year}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="year"
              >
                <option value="">Выберите год</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ButtonComponent variant="danger" size="large" onClick={onCancel}>
            Закрыть
          </ButtonComponent>
          <ButtonComponent
            variant="success"
            size="large"
            onClick={() => {
              onFilter(filters);
            }}
          >
            Отфильтровать
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}

export default PopupFilterComponent;
