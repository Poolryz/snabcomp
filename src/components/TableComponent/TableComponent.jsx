import RowTableComponent from "../RowTableComponent/RowTableComponent.jsx";
import "./TableComponent.scss";

function TableComponent({ data, deleteFunc, setForm, setPopupView }) {
  const formColumnsHeader = [
    "№",
    "Дата счета",
    "Организация",
    "№ счета",
    "Сумма",
    "Дата оплаты",
    "Ответственный",
    "Файлы",
    "Примечание",
    "Действия",
  ];
  return (
    <>
      <div className="table">
        <table className="table__element">
          <thead className="table__header">
            <tr className="table__row table__row--header">
              {formColumnsHeader.map((header, index) => (
                <th key={index} className="table__cell table__cell--header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {data.map((item, index) => (
              <RowTableComponent
                key={item.id}
                item={item}
                index={index}
                setForm={setForm}
                deleteFunc={deleteFunc}
                setPopupView={setPopupView}
              />
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="table__empty">Нет данных для отображения</div>
        )}
      </div>
    </>
  );
}
export default TableComponent;
