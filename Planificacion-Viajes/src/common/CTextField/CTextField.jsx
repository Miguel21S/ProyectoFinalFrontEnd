
import "./CTextField.css"
import TextField from "@mui/material/TextField";


const CTextField = ({ type, name, placeholder, value, changeEmit }) => {
    return (
        <div className="designText">
        <TextField
            className="textfiel-design"
            type={type}
            name={name}
            label={placeholder}
            value={value}
            onChange={(e) => changeEmit(e)}
        />
        </div>
    )
}

export default CTextField;