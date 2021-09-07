import {} from 'mongoose';


export default interface IContact extends Document {
    fullName: string,
    phoneNumber: string,
    address: string
}