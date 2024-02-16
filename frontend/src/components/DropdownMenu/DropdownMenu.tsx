import {useState} from "react";
import {FaCaretDown} from "react-icons/fa";
import {DropdownMenuList} from "../../utils/types";
import "./DropdownMenu.sass"
import useComponentVisible from "../../hooks/other/useComponentVisible";
import styled from "styled-components";

const DropdownMenu = ({ options, selectedOption, setSelectedOption, placeholder="Не выбран", width=300 }: DropdownMenuList) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const {ref} = useComponentVisible(setIsExpanded)

    const selectBtnClick = (e) => {
        e.preventDefault()
        setIsExpanded(!isExpanded)
    }

    const items = options.map(option => {
        return (
            <div key={option.id} onClick={() => {
                setIsExpanded(false)
                setSelectedOption(option.id)
            }}>
                {option.name}
            </div>
        )
    })

    return (
        <DropdownContainer width={width + "px"} className={"dropdown " + (isExpanded ? 'show' : '')} ref={ref}>

            <div className={"select"} onClick={selectBtnClick} >
                <span className={"selected"}>
                    {options.find(option => option.id == selectedOption) ?
                        options.find(option => option.id == selectedOption).name :
                        placeholder
                    }
                </span>
                <FaCaretDown className={"caret"} />
            </div>

            <ul className={"menu"} >

                { items }

            </ul>

        </DropdownContainer>
    );
}

const DropdownContainer = styled.div`
  width: ${( props ) => props.width }
`


export default DropdownMenu;