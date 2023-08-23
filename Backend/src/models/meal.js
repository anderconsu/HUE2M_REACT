import connection from "../db/mongoose.js";

const MealSchema = new connection.Schema({
    email: {
        type: String,
        required: true,
    },
    ingList: {
        type: Array,
        required: true,
    },
    nutrients: {
        type: Object,
        required: true,
    },
    date: {
        type: date,
        required: true,
        default: new Date(),
    }
});

const Meal = connection.model("Meal", MealSchema);

export default Meal;
