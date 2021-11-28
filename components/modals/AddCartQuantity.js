import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText"; //addCartQtModal//SHOW_ADDCARTQTY_MODAL
import { useDispatch, useSelector } from "react-redux";
import { HIDE_ADDCARTQTY_MODAL } from "../../redux/constants/designConstants";
import {
  addtoCart,
  clearCartErrors,
  clearCartMessages,
} from "../../redux/actions/cartActions";
import SendNotif from "../../utils/SendNotif";

const AddCartQuantity = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cart_message, cart_error } = useSelector((state) => state.cartOps);
  const { id, addCartQtModal, addrId, preview, title, unitCost, dCost } =
    useSelector((state) => state.design);
  useEffect(() => {
    if (cart_error) {
      dispatch(SendNotif("error", cart_error));
      dispatch(clearCartErrors());
    }
    if (cart_message) {
      dispatch(SendNotif("success", cart_message));
      dispatch(clearCartMessages());
    }
  }, [dispatch, cart_message, cart_error]);
  const handleClose = () => {
    dispatch({ type: HIDE_ADDCARTQTY_MODAL });
    //console.log("Closef")
  };
  const handleSubmit = () => {
    if (quantity <= 0 || quantity > 10)
      return dispatch(
        SendNotif("warning", "Sorry, Allowed Quantity Range: 1-10.")
      );
    dispatch(addtoCart(id, quantity, addrId, preview, title, unitCost, dCost));
    setQuantity(1);
    dispatch({ type: HIDE_ADDCARTQTY_MODAL });
  };
  const handleChange = (value) => {
    setQuantity(value);
  };
  return (
    <Dialog
      open={addCartQtModal === undefined ? false : addCartQtModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ fontSize: "17px" }}>
        Please Enter the Quantity
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "14px" }}>
          You can change quantity later.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="quantity"
          value={quantity}
          onChange={(e) => handleChange(e.target.value)}
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          color="error"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          color="success"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCartQuantity;
