
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCriteria, profileData } from '../../app/slices/profileSlice';
import { CInput } from '../../common/CInput/CInput';

const SearchComponent1 = () => {
    const [criteria, setCriteria] = useState("");
    const profile = useSelector(profileData);

    const dispatch = useDispatch();

   const handleSearchChange = (e) => {
       const newValue = e.target.value;
    setCriteria(newValue)
    if (newValue === "") {
        dispatch(updateCriteria({ criteria: "" }));
    }
};

    useEffect(() => {
        if (criteria !== "") {
            //guardo en redux.....
            dispatch(updateCriteria({ criteria }));
        }
    }, [criteria, dispatch]);

    console.log("profile criteria: ", profile.criteria)
    return (
        <>
            <div className="buscador">
                <div id='col-center' className="col">
                    <div className="header-center">
                        <CInput
                            type="text"
                            name="criteria"
                            placeholder="Buscar ..."
                            value={criteria}
                            changeEmit={handleSearchChange}
                        />

                    </div>
                </div>
            </div >
        </>
    );
};

export default SearchComponent1;
