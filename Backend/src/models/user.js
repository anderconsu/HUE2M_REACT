import connection from "../db/mongoose.js";

const UserSchema = new connection.Schema({
    email: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    birthday: {
        type: String,
        required: false,
    },
    sex: {
        type: String,
        required: false,
    },
    foodPreference: {
        type: String,
        required: false,
    },
    condition: {
        type: Array,
        required: false,
    },
});

const User = connection.model("User", UserSchema);

export default User;
