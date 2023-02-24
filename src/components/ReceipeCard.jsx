import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import ReceipeModal from "./ReceipeModal";

const cardStyle = {
  margin: "auto",
  height: "375px",
  width: "100%",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "0.375rem",
  background: "#ffcc80",
  transition: "box-shadow .3s",
  "&:hover": {
    boxShadow: "0 0 11px rgba(33,33,33,.2)"
  }
};

const textStyle = {
  display: "block",
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontFamily: "inherit",
  textAlign: "center",
  fontSize: "1.8rem"
};

const ReceipeCard = ({ strMeal, strMealThumb, idMeal }) => {
  const [open, setOpen] = useState(false);

  const handleModal = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  return (
    <Grid item xs={12} sm={6} md={3} sx={{ p: 1 }} onClick={handleModal}>
      <Box component={Card} style={cardStyle}>
        <Box sx={{ overflow: "hidden", width: "100%", height: "18rem" }}>
          <img src={strMealThumb} alt="" width="100%" loading="lazy" />
        </Box>

        <Box sx={{ marginTop: "1rem", padding: "1rem" }}>
          <Typography variant="h4" sx={textStyle}>
            {strMeal}
          </Typography>
        </Box>
      </Box>
      {open && (
        <ReceipeModal
          handleClose={handleModal}
          open={open}
          strMealThumb={strMealThumb}
          id={idMeal}
        />
      )}
    </Grid>
  );
};

export default ReceipeCard;
