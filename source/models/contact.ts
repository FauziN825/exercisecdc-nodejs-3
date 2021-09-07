import mongoose, { Schema } from "mongoose";
import IContact from "../interfaces/contact";


const ContactSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IContact>('Contact', ContactSchema);


