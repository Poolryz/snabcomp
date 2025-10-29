import { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./SearchComponent.scss";
function SearchComponent({ isFilters, setIsFilters }) {
  const [inputValue, setInputValue] = useState("");
  const [isSearch, setIsSearch] = useState({
    searchScope: "filtered",
    searchTarget: "all",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setIsSearch((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSearch() {
    if (!inputValue) {
      return;
    }
    let array = isFilters.map((item) => {
      const dataOrganizationName = item.organization.toLowerCase();
      const inputOrganizationName = inputValue.toLowerCase();
      return dataOrganizationName.includes(inputOrganizationName);
    });
    setIsFilters(array);
  }
  console.log(isFilters);

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
            value={isSearch.searchScope}
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
            value={isSearch.searchTarget}
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
