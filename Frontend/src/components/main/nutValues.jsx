//scss
import "./css/nutValues.scss";
//React
import { useEffect, useContext } from "react";
//Context
import IsDataContext from "../../context/isData";

import nutDict from "./nutDict";


const NutValues = ({ edamamData }) => {
    const {isData, setIsData} = useContext(IsDataContext);

    useEffect(() => {
        if (edamamData) {
            let formattedData = [];
            setIsData(true);
            Object.entries(edamamData.totalNutrients).forEach(([key, value]) => {
                if (value.quantity > 0) {
                    formattedData.push(`${value.quantity.toFixed(2)}${value.unit} de ${nutDict[key]}`);
                }
            })
            localStorage.setItem("formattedData", JSON.stringify(formattedData));
        }else(
            setIsData(false)
        )
    }, [edamamData]);

    return (
        <ul className="nutValues">
            {Object.entries(edamamData.totalNutrients).map(([key, value]) => {
                if (value.quantity > 0) {
                    return (
                        <li key={key}>
                            {nutDict[key]} : {value.quantity.toFixed(2)}{" "}
                            {value.unit}
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    );
};

export default NutValues;
