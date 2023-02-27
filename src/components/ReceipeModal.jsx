import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { singleMealSelector, searchSingleMeal } from "../features/ReceipeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "585px",
  height: "630px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "#000"
};

const loaderStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "40%",
  left: "40%",
  fontSize: "2rem"
};

const ReceipeModal = ({ open, strMealThumb, id }) => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const { meals } = useSelector(singleMealSelector);
  const { status } = useSelector((state) => state.receipe);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchSingleMeal(id));
  }, []);

  useEffect(() => {
    if (meals) {
      const ing = [];
      for (let i = 1; i <= Object.keys(meals[0]).length; i++) {
        if (meals[0][`strIngredient${i}`]) {
          ing.push({
            ingredient: meals[0][`strIngredient${i}`],
            measure: meals[0][`strMeasure${i}`]
          });
        } else {
          break;
        }
      }

      setIngredients([...ing]);

      const ins = meals[0]?.strInstructions.split("\r\n");
      const filteredInstruction = ins.filter((instruction) => Boolean(instruction));

      setInstructions([...filteredInstruction]);
    }
  }, [meals]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {meals ? (
            <>
              <Box
                sx={{ overflow: "hidden", width: "100%", height: "15rem", position: "relative" }}
              >
                <img
                  src={strMealThumb}
                  alt=""
                  style={{
                    width: "100%",
                    position: "absolute",
                    top: "-5rem",
                    maxWidth: "100%",
                    height: "auto"
                  }}
                />
              </Box>

              <Stack
                direction="row"
                sx={{ width: "100%", height: "390px", overflowY: "auto", position: "relative" }}
              >
                <Stack
                  direction="column"
                  sx={{
                    width: "33.333%",
                    height: "100%",
                    marginLeft: "0.5rem"
                  }}
                  xs={3}
                  sm={3}
                  spacing={1}
                >
                  <Typography
                    variant="h5"
                    sx={{ m: "0.5rem", fontFamily: "inherit", textAlign: "center" }}
                  >
                    {" "}
                    Ingredients{" "}
                  </Typography>

                  {ingredients?.map((ing) => (
                    <Stack direction="column">
                      <Typography variant="h6">{ing.ingredient}</Typography>
                      <Typography variant="p">{ing.measure}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack
                  direction="column"
                  sx={{
                    width: "66.666%",
                    height: "100%"
                  }}
                  xs={9}
                  sm={9}
                >
                  <Typography
                    variant="h5"
                    sx={{ m: "0.5rem", fontFamily: "inherit", textAlign: "center" }}
                  >
                    {meals[0]?.strMeal}
                  </Typography>

                  {instructions?.map((ins, i) => (
                    <Stack direction="column">
                      <Typography variant="h5"> Step {i + 1}</Typography>
                      <Typography variant="p">{ins}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </>
          ) : (
            <Box sx={loaderStyle}>
              Loading...
              <CircularProgress size="5rem" />
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default React.memo(ReceipeModal);
