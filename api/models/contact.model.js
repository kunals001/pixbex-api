import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        reason:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Touch = mongoose.model("Contact", contactSchema);
export default Touch;