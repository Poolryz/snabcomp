import ButtonComponent from "../ButtonComponent/ButtonComponent";
function RowTableComponent({ item, index, setForm, deleteFunc }) {
  const formatInvoiceDate = new Date(item.invoiceDate).toLocaleDateString(
    "ru-RU"
  );
  const formatPaymentDate = new Date(item.paymentDate).toLocaleDateString(
    "ru-RU"
  );
  return (
    <tr key={item.id} className="table__row table__row--body">
      <td className="table__cell table__cell--body">{index + 1}</td>
      <td className="table__cell table__cell--body">{formatInvoiceDate}</td>
      <td className="table__cell table__cell--body">{item.organization}</td>
      <td className="table__cell table__cell--body">{item.invoiceNumber}</td>
      <td className="table__cell table__cell--body">{item.amount}</td>
      <td className="table__cell table__cell--body">{formatPaymentDate}</td>
      <td className="table__cell table__cell--body">{item.responsible}</td>
      <td className="table__cell table__cell--body">{item.note}</td>
      <td className="table__cell table__cell--body table__cell--actions">
        <div className="table__actions">
          <ButtonComponent
            size="xsmall"
            variant="success"
            value={item.id}
            onClick={() => {
              setForm(item.id);
            }}
          >
            Редактировать
          </ButtonComponent>
          <ButtonComponent
            size="xsmall"
            variant="danger"
            value={item.id}
            onClick={() => {
              deleteFunc(item.id);
            }}
          >
            Удалить
          </ButtonComponent>
        </div>
      </td>
    </tr>
  );
}
export default RowTableComponent;
