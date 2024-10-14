const { Schema, models } = require("mongoose");

const PropertySchema = new Schema(
    {
        owner: {
            type: String,
            ref: "User",
            required: [true, "The Owner must be required !"],
        },
        name: {
            type: String,
            required: [true, "The Name must be required !"],
        },
        type: {
            type: String,
            required: [true, "The type must be required !"],
        },
        description: {
            type: String,
        },
        location: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipcode: {
                type: String,
            },
        },
        beds: {
            type: Number,
            required: [true, "The Beds must be required !"],
        },
        baths: {
            type: Number,
            required: [true, "The Baths must be required !"],
        },
        square_feet: {
            type: Number,
            required: [true, "The Square Feet must be required !"],
        },
        amentities: [
            {
                type: String,
            },
        ],
        rates: {
            nightly: {
                type: Number,
            },
            weekly: {
                type: Number,
            },
            monthly: {
                type: Number,
            },
        },
        seller_info: {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
        },
        images: [
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Property = models.Property || model("Property", PropertySchema);
export default Property;
