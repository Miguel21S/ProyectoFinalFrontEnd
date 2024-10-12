
import "./CTextField.css";
import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const CCalendar = ({ type, name, placeholder, changeEmit }) => {
    const classes = useStyles();
    return (
        <div className="designText">
            <form className={classes.container} noValidate>
                <TextField
                    name={name}
                    label={placeholder}
                    type={type}
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => changeEmit(e)}
                />
            </form>
        </div>
    );
}

export default CCalendar;




