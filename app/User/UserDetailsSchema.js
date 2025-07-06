import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({

    username:String,
    password:String,
    name:String,
    photoUrl:String,
    MobileNo:String,
    Address:String,
    Pincode:String,
    friendreq:[String],
    friends:[String],
    GroupsJoined:{},
    Image:String,
    CreatedAt:String,
    CreatedBy:String,
    Type:String,
})
const UserModel=mongoose.models.userdetail || mongoose.model("userdetail", UserSchema);
export default UserModel;