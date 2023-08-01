let nutDict = {
    ENERC_KCAL : "calorias",
    FAT : "grasas",
    FASAT : "grasas saturadas",
    FAMS : "grasas monoinsaturadas",
    FAPU : "grasas polinsaturadas",
    CHOCDF : "carboidratos, por diferencia",
    "CHOCDF.net" : "carboidratos (netos)",
    FIBTG : "fibra",
    SUGAR : "azúcares",
    PROCNT : "proteinas",
    NA : "sodio",
    CA : "calcio",
    MG : "magnesio",
    K : "potasio",
    FE : "hierro",
    ZN : "zinc",
    P : "fósforo",
    VITA_RAE : "vitamina A, RAE",
    VITC : "vitamina C",
    THIA : "vitamina B1",
    RIBF : "riboflavina,",
    NIA : "niacina",
    VITB6A : "vitamina B6",
    FOLDFE : "folato, DFE",
    FOLFD : "folato, comida",
    TOCPHA : "vitamina E",
    VITK1 : "vitamina K",
    WATER : "agua",
};


const NutValues = ({ edamamData }) => {
    return (
        <ul>
            {Object.entries(edamamData.totalNutrients).map(([key, value]) => {
                if (value.quantity > 0) {
                    return (
                        <li key={key}>
                            {nutDict[key]} : {value.quantity.toFixed(2)} {value.unit}
                        </li>
                    );
                }
                return null;
            })}
        </ul>
    );
};

export default NutValues;
