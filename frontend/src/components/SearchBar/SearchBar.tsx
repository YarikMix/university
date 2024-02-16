import {FaSearch} from "react-icons/fa";
import "./SearchBar.sass"
import styled from "styled-components";
import CustomButton from "../CustomButton/CustomButton";

const SearchBar = ({placeholder, query, setQuery, width=250}) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <SearchBarContainer width={width + "px"} className="search-bar">

            <input
                type="text"
                placeholder={placeholder}
                name="query"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button>
                <FaSearch className={"search-icon"}/>
            </button>

        </SearchBarContainer>
    );
}

const SearchBarContainer = styled.form`
  width: ${( props ) => props.width };
  @media (max-width: 520px) {
    width: 100%;
  }
`

export default SearchBar;