import "./TableComponent.scss";

function TableComponent({ data }) {
  return (
    <>
      <div className="table">
        <table className="table__element">
          <thead className="table__header">
            <tr className="table__row table__row--header">
              <th className="table__cell table__cell--header">№</th>
              <th className="table__cell table__cell--header">Дата счета</th>
              <th className="table__cell table__cell--header">Организация</th>
              <th className="table__cell table__cell--header">№ счета</th>
              <th className="table__cell table__cell--header">Сумма</th>
              <th className="table__cell table__cell--header">Дата оплаты</th>
              <th className="table__cell table__cell--header">Ответственный</th>
              <th className="table__cell table__cell--header">Примечание</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="table__row table__row--body"
              >
                <td className="table__cell table__cell--body">{index + 1}</td>
                <td className="table__cell table__cell--body">
                  {item.invoiceDate}
                </td>
                <td className="table__cell table__cell--body">
                  {item.organization}
                </td>
                <td className="table__cell table__cell--body">
                  {item.invoiceNumber}
                </td>
                <td className="table__cell table__cell--body">{item.amount}</td>
                <td className="table__cell table__cell--body">
                  {item.paymentDate}
                </td>
                <td className="table__cell table__cell--body">
                  {item.responsible}
                </td>
                <td className="table__cell table__cell--body">{item.note}</td>
              </tr>
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
