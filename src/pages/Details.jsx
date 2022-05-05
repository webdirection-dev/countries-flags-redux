import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {loadCountryByName, clearDetails} from "../store/details/details-actions";
import {selectDetails} from "../store/details/details-selectors";

import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Button';
import { Info } from '../components/Info';


export const Details = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const {currentCountry, status, error} = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountryByName(name))

        //componentDidUnmount
        return () => {
            dispatch(clearDetails())
        }
    }, [dispatch, name])

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                <IoArrowBack /> Back
            </Button>

            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}

            {currentCountry && <Info push={navigate} {...currentCountry} />}
        </div>
    );
};
