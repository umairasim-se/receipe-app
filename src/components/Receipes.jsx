import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { filteredMealsSelector, mealsSelector } from "../features/ReceipeSlice";
import ReceipeCard from "./ReceipeCard";

const Receipes = () => {
  const { meals } = useSelector(mealsSelector);
  const filteredMeals = useSelector(filteredMealsSelector);

  const [mealReceipes, setMealReceipes] = useState([]);

  useEffect(() => {
    if (filteredMeals) {
      setMealReceipes(filteredMeals?.meals);
    } else {
      setMealReceipes(meals);
    }
  }, [filteredMeals, meals]);

  return (
    <Grid
      container
      sx={{
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 2rem"
      }}
    >
      {mealReceipes?.map((meal) => (
        <ReceipeCard key={meal?.idMeal} {...meal} />
      ))}
    </Grid>
  );
};

export default Receipes;
