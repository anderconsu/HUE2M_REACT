//React
import { useEffect, useContext } from "react";
import "./css/nutValues.scss";
//Context
import IsDataContext from "../../context/isData";

let nutDict = {
    ENERC_KCAL: "Calorias",
    FAT: "Grasas",
    CHOLE: "Colesterol",
    FASAT: "Grasas saturadas",
    FAMS: "Grasas monoinsaturadas",
    FAPU: "Grasas polinsaturadas",
    CHOCDF: "Carboidratos, por diferencia",
    "CHOCDF.net": "Carboidratos (netos)",
    FIBTG: "Fibra",
    SUGAR: "Azúcares",
    PROCNT: "Proteinas",
    NA: "Sodio",
    CA: "Calcio",
    MG: "Magnesio",
    K: "Potasio",
    FE: "Hierro",
    ZN: "Zinc",
    P: "Fósforo",
    VITA_RAE: "Vitamina A, RAE",
    VITC: "Vitamina C",
    THIA: "Vitamina B1",
    RIBF: "Riboflavina,",
    NIA: "Niacina",
    VITB6A: "Vitamina B6",
    FOLDFE: "Folato, DFE",
    FOLFD: "Folato, comida",
    FOLAC: "Ácido fólico",
    TOCPHA: "Vitamina E",
    VITK1: "Vitamina K",
    WATER: "Agua",
    VITB12: "Vitamina B12",
    VITD: "Vitamina D",
};

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
