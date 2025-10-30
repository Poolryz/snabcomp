import "./TableItemPage.scss";
function TableItemPage() {
  const formColumnsHeader = [
    "№",
    "Название ТМЦ",
    "Единица измерения",
    "Остаток",
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
                <th
                  key={index}
                  className={`table__cell table__cell--header ${
                    index === 0
                      ? "table__cell--number"
                      : index === 1
                      ? "table__cell--name"
                      : index === 2
                      ? "table__cell--unit"
                      : index === 3
                      ? "table__cell--balance"
                      : index === 4
                      ? "table__cell--note"
                      : "table__cell--actions"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {/* Здесь будут добавляться строки с данными */}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TableItemPage;
