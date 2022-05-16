import { Router } from "express";
import { isAuthenticated } from "../middelware/auth.js";
import Ticket from "../models/ticket.js";

const ticketRouter = Router();

ticketRouter.post("/add", isAuthenticated, async (req, res) => {
  var ticketData = {
    title: req.body.title,
    description: req.body.description,
    user_Id: req.user._id,
    user_Name: req.user.firstName,
  };
  const ticket = await Ticket.create(ticketData);
  res.status(201).json(ticket);
});

ticketRouter.get("/all", async (req, res) => {
  try {
    Ticket.find(
      {
        isDeleted: false,
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (err) {
    return err;
  }
});
ticketRouter.get("/:id", async (req, res) => {
  try {
    Ticket.find(
      {
        _id: req.params.id,
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (err) {
    return err;
  }
});
ticketRouter.delete("/:id", (req, res) => {
  try {
    Ticket.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deleted_at: new Date(),
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (err) {
    return err;
  }
});
ticketRouter.put("/:id", (req, res) => {
  console.log(req.body);
  var ticketData = {
    title: req.body.title,
    description: req.body.description,
  };
  try {
    Ticket.findByIdAndUpdate(req.params.id, ticketData, (err, ticket) => {
      if (err) {
        return err;
      }
      console.log(ticket);
      return res.status(200).json({ ticket });
    });
  } catch (err) {
    return err;
  }
});

export default ticketRouter;
