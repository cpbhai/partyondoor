import { Fragment, useEffect } from "react";
import Link from "next/link";
import MetaData from "../utils/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCart,
  increaseCart,
  decreaseCart,
  removeFromCart,
  clearCartMessages,
} from "../redux/actions/cartActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendNotif from "../utils/SendNotif";
import Swal from "sweetalert2";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartOps);
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);
  const handleIncrease = (id, curQuant) => {
    if (curQuant > 9) {
      return dispatch(
        SendNotif("warning", "Sorry, Only max. 10 quantities are allowed.")
      );
    }
    dispatch(increaseCart(id));
  };
  const handleDecrease = (id, curQuant) => {
    if (curQuant === 1) {
      return dispatch(
        SendNotif(
          "warning",
          "To remove it, please click on red button on right side."
        )
      );
    }
    dispatch(decreaseCart(id));
  };
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
      }
    });
  };
  return (
    <Fragment>
      <div>
        <MetaData title="My Cart | www.partyondoor.com" />
        {!cart ? (
          <></>
        ) : cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cartMainDiv">
            <div className="cartSpace-1"></div>
            <div className="cartItmsDiv">
              {cart.map((itm, idx) => (
                <div className="cartItmDiv" key={idx}>
                  <div className="cartImgDiv">
                    <img src={itm.preview} alt="..." />
                  </div>
                  <div className="cartItmDetailNOps">
                    <p className="cartItmDetpara">
                      <Link href={`/item?w=${itm._id}`}>
                        <a>
                          {itm.title} ({itm.unitCost.unit})
                        </a>
                      </Link>
                    </p>
                    <p className="cartItmDetpara">
                      ₹ {itm.unitCost.cost} X {itm.quantity} + ₹ {itm.dCost}{" "}
                      <br></br>= ₹{" "}
                      {itm.unitCost.cost * itm.quantity + itm.dCost}
                    </p>
                    <div className="cartItmOps">
                      <IconButton
                        onClick={() => {
                          handleIncrease(itm._id, itm.quantity);
                        }}
                      >
                        <AddIcon color="success" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          handleDecrease(itm._id, itm.quantity);
                        }}
                      >
                        <RemoveIcon sx={{ color: "tomato" }} />
                      </IconButton>

                      <IconButton onClick={() => handleRemove(itm._id)}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </div>
                    <p>₹ {itm.dCost} is Delivery Cost.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
