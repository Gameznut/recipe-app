<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/bundle";
import { Pagination, Navigation } from "swiper";
import { useMealStore } from "../stores/meal";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const modules = [Pagination, Navigation];
const meals = useMealStore();
const random = meals.random.data.meals[0];
const { data } = meals.categories;
const test = meals.search;
</script>

<template>
  <header>
    <h1 class="text-[3rem] font-[700]">Recipe App</h1>
    <p class="text-[2rem] font-[700] mb-[2rem]">Learn how to cook</p>
  </header>
  <main>
    <div class="flex justify-center items-center">
      <div class="card h-[250px] max-w-[500px]">
        <div>
          <h1>{{ random.strMeal }}</h1>
          <span class="block">Ratings 4/5</span>
        </div>

        <div
          class="
            max-w-[10rem]
            border-4 border-teal-500
            rounded-[2rem]
            overflow-hidden
          "
        >
          <img class="p-2 rounded-[2rem]" :src="random.strMealThumb" alt="" />
        </div>
      </div>
    </div>
    {{ meals.search }}

    <div class="my-[1rem]">
      <h1 class="mb-[.5rem] text-[2rem] font-[700]">Categories</h1>
      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper">
        <swiper-slide
          class="
            bg-[#d3e6bd]
            text-center
            w-max
            p-[.5rem]
            px-[1rem]
            cursor-pointer
            rounded-[.3rem]
            text-black
          "
          v-for="(category, i) in data.meals"
          :class="{ active: meals.title == category.strCategory }"
          :key="i"
          @click="useMealStore().filters(category.strCategory)"
          >{{ category.strCategory }}</swiper-slide
        >
      </swiper>
    </div>

    <section>
      <h1 class="text-[2rem] font-[800]">{{ meals.title }}</h1>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          class="cards"
          v-for="collection in meals.result.meals"
          :key="collection.idMeal"
        >
          <div class="card" @click="meals.searches(collection.strMeal)">
            <div>
              <h1>{{ collection.strMeal }}</h1>
              <span class="block">Ratings 4/5</span>
            </div>

            <div
              class="
                max-w-[10rem]
                overflow-hidden
                border-teal-500 border-2
                rounded-[2rem]
              "
            >
              <img
                class="p-2 rounded-[2rem]"
                :src="collection.strMealThumb"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.card {
  width: 100%;
  /* max-width: 500px; */
  display: flex;
  align-items: center;
  background: rgb(36, 35, 35);
  color: rgb(0, 255, 170);
  border-radius: 1rem;
  padding: 1rem;
  justify-content: space-between;
  height: 250px;
  box-shadow: 1px 2px 21px rgba(49, 49, 51, 0.74);
  cursor: pointer;
}

.card h1 {
  font-size: 20px;
}

.active {
  background: rgb(14, 148, 211);
}
</style>