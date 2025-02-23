import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "Minimum length is 2 characters"],
      maxLength: [100, "Maximum length is 100 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [2, "Minimum length is 2 characters"],
      maxLength: [100, "Maximum length is 30 characters"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    avatar: { type: String, default: "" }, // URL da imagem ou base64
    userType: {
      type: String,
      enum: ["RN", "LPN", "Chief"],
      required: true,
    },
    department: { type: String, required: true },
    institution: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Minimum length is 6 characters"],
    },
    country: { type: String }, // Endereço dividido
    city: { type: String }, // Endereço dividido
    street: { type: String }, // Endereço dividido
    zipCode: { type: String }, // Endereço dividido
    phoneNumber: { type: String },
    contractDetails: { type: String, default: "" },
    dateOfBirth: { type: Date },
    medicalId: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
