import { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./SearchComponent.scss";
function SearchComponent({ data, filteredData, setFilteredData }) {
  const [inputValue, setInputValue] = useState("");
  const [isParamSearch, setIsParamSearch] = useState({
    searchScope: "filtered",
    searchTarget: "all",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setIsParamSearch((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSearch() {
    let array = [];
    if (isParamSearch.searchScope === "all") {
      array = data.filter((item) => {
        if (isParamSearch.searchTarget === "notes") {
          if (item.note === null) {
            return false;
          }
          const dataNote = item.note.toLowerCase();
          const inputNote = inputValue.toLowerCase();
          return dataNote.includes(inputNote);
        } else if (isParamSearch.searchTarget === "organizations") {
          const dataOrganizationName = item.organization.toLowerCase();
          const inputOrganizationName = inputValue.toLowerCase();
          return dataOrganizationName.includes(inputOrganizationName);
        } else if (isParamSearch.searchTarget === "all") {
          const dataOrganizationName = item.organization.toLowerCase();
          const inputOrganizationName = inputValue.toLowerCase();
          const noteMatch =
            item.note &&
            item.note.toLowerCase().includes(inputValue.toLowerCase());
          return (
            dataOrganizationName.includes(inputOrganizationName) || noteMatch
          );
        }
      });
    } else if (isParamSearch.searchScope === "filtered") {
      array = filteredData.filter((item) => {
        if (isParamSearch.searchTarget === "notes") {
          if (item.note === null) {
            return false;
          }
          const dataNote = item.note.toLowerCase();
          const inputNote = inputValue.toLowerCase();
          return dataNote.includes(inputNote);
        } else if (isParamSearch.searchTarget === "organizations") {
          const dataOrganizationName = item.organization.toLowerCase();
          const inputOrganizationName = inputValue.toLowerCase();
          return dataOrganizationName.includes(inputOrganizationName);
        } else if (isParamSearch.searchTarget === "all") {
          const dataOrganizationName = item.organization.toLowerCase();
          const inputOrganizationName = inputValue.toLowerCase();
          const noteMatch =
            item.note &&
            item.note.toLowerCase().includes(inputValue.toLowerCase());
          return (
            dataOrganizationName.includes(inputOrganizationName) || noteMatch
          );
        }
      });
    }

    setFilteredData(array);
    console.log(array);
  }

  return (
    <div className="search">
      <div className="search__content">
        <input
          value={inputValue}
          type="text"
          className="search__input"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div className="search__field">
          <label className="search__label">Где ищем</label>
          <select
            name="searchScope"
            id=""
            value={isParamSearch.searchScope}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="filtered">С заданым фильтром</option>
            <option value="all">Во всех счетах</option>
          </select>
        </div>
        <div className="search__field">
          <label className="search__label">Что ищем</label>
          <select
            name="searchTarget"
            id=""
            value={isParamSearch.searchTarget}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="all">Всё</option>
            <option value="organizations">Организации</option>
            <option value="notes">Примечания</option>
          </select>
        </div>
        <ButtonComponent
          variant="success"
          size="medium"
          onClick={() => {
            handleSearch();
          }}
        >
          Поиск
        </ButtonComponent>
      </div>
    </div>
  );
}
export default SearchComponent;
