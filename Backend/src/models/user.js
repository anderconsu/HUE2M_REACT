import connection from "../db/mongoose.js";

const UserSchema = new connection.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
    foodPreference: {
        type: String,
        required: false,
    },
    condition: {
        type: String,
        required: false,
    },
});

const User = connection.model("User", UserSchema);

export default User;
