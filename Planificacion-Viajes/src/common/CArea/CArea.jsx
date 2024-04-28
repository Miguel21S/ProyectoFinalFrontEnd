
import "./CArea.css"

export const CArea = ({ type, name, placeholder, value, changeEmit }) => {
    return (
        <textarea
            className="text-design"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => changeEmit(e)}
            required
        />
    )
}