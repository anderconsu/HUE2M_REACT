import User from "../../models/user.js";

const addUser = async () => {
    const user = new User({
        email: "prueba",
        height: "1.78",
        weight: "80",
        age: "20",
        genre: "masculino",
        foodPreference: "vegano",
        condition: "normal",
    })
    await user.save()
}
export default addUser