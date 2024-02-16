import "./CustomInput.sass"

const CustomInput = ({key, value, name, onChange}) => {
    return (
        <div className="input-container">
            <label htmlFor={key}>{name}</label>
            <input id={key} value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default CustomInput