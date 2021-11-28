import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = ({ show }) => {
  //show may be undefined so used ternary ops
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show ? true : false}
    >
      <CircularProgress sx={{ color: "#fff" }} />
    </Backdrop>
  );
};
export default Loading;
