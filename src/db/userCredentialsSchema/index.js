import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const userCredentialsSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ownerName:{
        type: String,
        required: true,
    },
    website_name: {
      type: String,
      required: true,
      unique: true,
    },
    website_username : {
      type: String,
      required: true,
    },
    website_password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserData =
  models.passwordManager || model("userCredentialsData", userCredentialsSchema);
export default UserData;
