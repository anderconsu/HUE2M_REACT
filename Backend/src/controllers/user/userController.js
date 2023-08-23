import User from "../../models/user.js";

const addUser = async (req, res) => {
    let userInfo = req.body.user
    let dbUser = await User.findOne({ email: userInfo.email })
    if (dbUser) {
        return res.status(400).send("Este usuario ya ha sido registrado anteriormente.")
    }
    const user = new User({
        email: userInfo.email,
        height: userInfo.height,
        weight: userInfo.weight,
        age: userInfo.age,
        genre: userInfo.genre,
        foodPreference: userInfo.foodPreference,
        condition: userInfo.condition,
    })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}
export default addUser