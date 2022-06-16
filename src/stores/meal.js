import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
const random = await axios.get(
  "https://www.themealdb.com/api/json/v1/1/random.php"
);
const categories = await axios.get(
  "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
);
const { data } = await axios.get(
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`
);


export const useMealStore = defineStore({
  id: "meal",
  state: () => ({
    random,
    categories,
    result: data,
    title: "Beef",
    search: null,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async filters(search) {
      const result = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`
      );
      this.title = search;
      this.result = result.data;
    },
    async searches(search) {
      const result = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      this.search = result.data;
    },
  },
});
