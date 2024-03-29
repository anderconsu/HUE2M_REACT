import User from "../../models/user.js";
import deleteFirebaseUser from "./firebaseController.js";
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
        console.log("email a buscar: ", req.body.email);
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("usuario no encontrado");
            res.status(404).send("Not Found");
        }else{
            console.log("usuario encontrado");
            res.status(200).json(user);
        }
    } catch (error) {
        console.log("error en getUser", error);
        res.status(400).json(error);
    }
};
const updateUser = async (req, res) => {
    console.log("usuario a actualizar: ", req.body.email);
    let user = {email: req.body.email};
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.birthday = req.body.birthday;
    user.sex = req.body.sex;
    user.foodPreference = req.body.foodPreference;
    user.condition = req.body.condition;
    try {
        let updateUser = await User.findOneAndUpdate({ email: user.email }, user );
        if (!updateUser) {
            res.status(404).send();
        }else{
            res.status(200).send();
        }
    } catch (error) {
        console.log("error en getUser", error);
        res.status(400).send();
    }
}

const deleteUser = async (req, res) => {
    console.log("usuario a eliminar: ", req.body.email);
    let user = {email: req.body.email};
    try {
        let deleteUser = await User.findOneAndDelete({ email: user.email });
        if (!deleteUser) {
            res.status(404).send();
        }else{
            try {
            let response = await deleteFirebaseUser(req, res);
            if (response === true){
                res.status(200).send();
            }else{
                res.status(400).send({error: response.error});
            }
        } catch (error) {
            console.log("error en getUser", error);
            res.status(400).send();
        }
        }
    } catch (error) {
        console.log("error en deleteUser", error);
        res.status(400).send();
    }
}
export default { addUser, getUser, updateUser, deleteUser };
