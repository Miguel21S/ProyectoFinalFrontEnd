
import "./CInput.css"

export const CInput = ( {type, name, placeholder, value, changeEmit} ) => {
    return (
        <input
            className="input-Design"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e)=> changeEmit(e)}
        />
    )
}