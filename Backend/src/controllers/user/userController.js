import User from "../../models/user.js";

const addUser = async (req, res) => {
    let userInfo = req.body;
    let dbUser = await User.findOne({ email: userInfo.email });
    if (dbUser) {
        console.log("Se ha intentado registrar a un usuario que ya existe.");
        res.status(409).send();
    } else {
        const user = new User({
            email: userInfo.email,
            height: userInfo.height,
            weight: userInfo.weight,
            birthday: userInfo.birthday,
            sex: userInfo.sex,
            foodPreference: userInfo.foodPreference,
            condition: userInfo.condition,
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error);
            console.log("error en addUser", error);
        }
    }
};
const getUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).send();
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
        console.log("error en getUser", error);
    }
};
export default { addUser, getUser };
