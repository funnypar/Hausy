const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "This field must be unique !"],
            required: [true, "The Email must be required !"],
        },
        username: {
            type: String,
            required: [true, "The Username must be required !"],
        },
        image: {
            type: String,
        },
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Property",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);

export default User;
