import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000
});

const MAX_RETRIES = 5;
const DELAY_MS = 1000;

const getCategories = async () => {
  try {
    const categories = await api.get(`/list.php?c=list`);
    return categories.data;
  } catch (e) {
    console.log(e.message);
  }
};

const getMeals = async (category = "") => {
  try {
    const meals = await api.get(`/filter.php?c=${category}`);
    return meals.data;
  } catch (e) {
    console.log(e.message);
  }
};

const getUniqueMeal = async (id = "") => {
  try {
    const meal = await api.get(`/lookup.php?i=${id}`);
    return meal.data;
  } catch (e) {
    console.log(e.message);
  }
};

const searchByName = async (name = "", retries = 0) => {
  try {
    const meal = await api.get(`/search.php?s=${name}`);
    return meal.data;
  } catch (err) {
    if (retries < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return searchByName(name, retries + 1);
    }
    throw new Error("Maximum number of retries exceeded");
  }
};

export { getCategories, getMeals, searchByName, getUniqueMeal };
