import mongoose from "mongoose";

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return "This is Not Valid Id";
  }
};

export default validateMongodbId;
