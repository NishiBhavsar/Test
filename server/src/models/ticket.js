import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Types.ObjectId,
    },
    user_Name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "cretedAt",
      updatedAt: "updatedAt",
    },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;