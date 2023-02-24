import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useDispatch, useSelector } from "react-redux";

import {
  getMealCategories,
  categorySelector,
  getNewMeals,
  searchMealByName,
  resetFilteredMeals
} from "../features/ReceipeSlice";

const Header = () => {
  const [category, setCategory] = useState("Dessert");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { meals } = useSelector(categorySelector);

  useEffect(() => {
    dispatch(getMealCategories());
  }, []);

  useEffect(() => {
    dispatch(getNewMeals(category));
  }, [category]);

  const searchReults = (e) => {
    const { value } = e.target;

    if (!value) {
      setQuery("");
      dispatch(resetFilteredMeals());
      return;
    }

    setQuery(value);
  };

  return (
    <Box component="nav" p="2rem">
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1} sx={{ color: "#000" }}>
          <RestaurantMenuIcon fontSize="large" />
          <Typography variant="h4" sx={{ color: "#000", fontFamily: "inherit" }}>
            Receipe App
          </Typography>
        </Stack>

        <Box comoponent="div" sx={{ outline: "none" }}>
          <TextField
            size="small"
            placeholder="Search"
            value={query}
            onChange={searchReults}
            sx={{
              background: "#fff",
              fontFamily: "inherit",
              borderRadius: "4px",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }}
          />

          <button
            onClick={() => {
              if (!query) return;

              dispatch(searchMealByName(query));
            }}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, height: "40px" }}
          >
            Search
          </button>
          <Stack direction="row" justifyContent="flex-end" sx={{ m: "2rem 0" }}>
            <FormControl>
              <InputLabel id="category-id"> Category </InputLabel>
              <Select
                labelId="category-id"
                id="category-id"
                name="category"
                label="Category"
                sx={{ background: "#fff", width: "200px" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {meals?.map((category) => (
                  <MenuItem key={category?.strCategory} value={category?.strCategory}>
                    {category?.strCategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
