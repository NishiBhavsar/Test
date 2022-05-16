import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import http from "../config/http";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import usePagination from "../Pagination";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Ticket({ getLists }) {
  const [modalopen, setModalOpen] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [userData, setUserData] = useState([]);
  // const rows = [];
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(ticketList.length / PER_PAGE);
  const _DATA = usePagination(ticketList, PER_PAGE);
  let [pageCount, setPageCount] = useState(0);
  const handleChange = (e, p) => {
    console.log("p", p);
    setPageCount((p - 1) * 10);
    console.log("pagecount", pageCount);
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("user")));
      getLists().then((res) => {
        setTicketList(res);
      });
    } catch (err) {}
  }, []);

  const editTicket = async (id) => {
    const res = await http.put(`/ticket/${id}`);
    console.log("res", res);
    setTicketData(res.data.ticket);
    setEditId(id);
    setModalOpen(true);
  };
  const deleteTicket = async (id) => {
    // http.delete("/ticket/delete",this.props.match.params.id);
    const res = await http.delete(`/ticket/${id}`);
    getLists().then((res) => {
      setTicketList(res);
    });
  };
  const formik = useFormik({
    initialValues: {
      title: ticketData?.title,
      description: ticketData?.description,
    },
    enableReinitialize: true,
    onSubmit: async (val) => {
      // alert(JSON.stringify(val, null, 2));
      if (!editId) {
        const res = await http.post("/ticket/add", val);
      } else {
        const res = await http.put(`/ticket/${editId}`, val);
        setEditId(null);
        console.log("res", res);
      }
      setTicketData([]);
      setModalOpen(false);

      getLists().then((res) => {
        setTicketList(res);
      });
      // const res = await http.post("/user/signin", val);
      // console.log(res.data);
    },
  });
  return (
    <div style={{ backgaroundColor: "#EFEAD8" }}>
      {console.log(ticketList)}
      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        style={{ color: "#5F7161" }}
      >
        Tickets{" "}
        <Button
          marginLeft="10"
          variant="contained"
          style={{ backgroundColor: "#6D8B74" }}
          onClick={() => {
            setModalOpen(true);
            setTicketData([]);
            setEditId(null);
          }}
        >
          Add Ticket
        </Button>
      </Typography>
      <Modal
        open={modalopen}
        onClose={() => {
          setModalOpen(false);
          setTicketData([]);
          setEditId(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Add Title"
            name="title"
            autoFocus
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button type="submit">{editId ? "Edit Ticket" : "Add Ticket"}</Button>
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow style={{ backgroundColor: "#6D8B74" }}>
            <TableCell style={{ color: "#EFEAD8" }}>No</TableCell>
            <TableCell style={{ color: "#EFEAD8" }}>Title</TableCell>
            <TableCell style={{ color: "#EFEAD8" }}>Description</TableCell>
            <TableCell style={{ color: "#EFEAD8" }}>Create_at</TableCell>
            <TableCell style={{ color: "#EFEAD8" }}>Created_by</TableCell>
            <TableCell style={{ color: "#EFEAD8" }} align="left">
              Edit
            </TableCell>
            <TableCell style={{ color: "#EFEAD8" }} align="left">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log("list", ticketList)} */}
          {_DATA.currentData().map((row) => (
            <TableRow key={row._id}>
              <TableCell>{(pageCount = pageCount + 1)}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.cretedAt}</TableCell>
              <TableCell>{row.user_Name}</TableCell>
              <TableCell>
                {userData.firstName === row.user_Name ? (
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editTicket(row._id);
                    }}
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="edit" disabled color="inherit">
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {userData.firstName === row.user_Name ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteTicket(row._id);
                    }}
                    color="inherit"
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="delete" disabled color="inherit">
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <Box>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}
