<template>
  <SectionWrapper class="scroll-mt-10" id="stock">
    <div class="flex items-center justify-between">
      <SectionHeading text="Авто в наличии" />
      <div id="countries"></div>
    </div>

    <div class="mt-8">
      <div
        class="flex flex-col items-start lg:justify-between lg:items-center lg:flex-row"
      >
        <ClientOnly>
          <Teleport to="#countries" :disabled="greaterThanLg || smallerThanSm">
            <div class="p-1.5 overflow-hidden bg-black rounded-full lg:p-2">
              <button
                type="button"
                v-for="c in countries"
                :key="c.value"
                @click="updateCurrentCountry(c)"
                :class="[
                  'px-3 lg:px-4 py-1 lg:py-2 rounded-full font-medium text-sm sm:text-base',
                  { 'bg-[#FFD600]': c.code === currentCountry },
                  { 'text-white': c.code !== currentCountry },
                ]"
              >
                {{ c.name }}
              </button>
            </div>
          </Teleport>

          <div
            class="hidden sm:flex sm:w-full lg:w-auto lg:block sm:p-1 lg:p-2 sm:overflow-hidden sm:border sm:border-[#868686] sm:rounded-full"
          >
            <button
              type="button"
              v-for="t in types"
              :key="t.value"
              @click="updateCurrentType(t)"
              :class="[
                'flex-1 px-4 py-2 rounded-full font-medium',
                { 'bg-[#FFD600]': t.value === currentType.value },
              ]"
            >
              {{ t.name }}
            </button>
          </div>

          <HeadlessMenu
            as="div"
            v-slot="{ open }"
            class="relative w-full mt-2 text-left sm:hidden"
          >
            <div class="p-1.5 bg-black rounded-full">
              <HeadlessMenuButton
                class="flex items-center w-full relative z-[10]"
              >
                <span
                  class="inline-flex items-center justify-center bg-[#FFD600] rounded-full h-10 w-full text-sm font-semibold"
                >
                  {{ currentType.name }}
                </span>
                <span
                  class="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-[#FFD600] ml-1"
                >
                  <span
                    :class="[
                      'w-6 h-6 i-heroicons-chevron-down-20-solid',
                      { 'rotate-180': open },
                    ]"
                  ></span>
                </span>
              </HeadlessMenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <HeadlessMenuItems
                class="absolute left-1.5 w-[calc(100%-3.5rem)] -mt-8 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]"
              >
                <div class="px-1 pb-1 text-sm font-semibold text-center pt-7">
                  <HeadlessMenuItem
                    v-for="t in types"
                    :key="t.value"
                    v-slot="{ active }"
                  >
                    <button
                      @click="updateCurrentType(t)"
                      class="block w-full px-2 py-2"
                    >
                      {{ t.name }}
                    </button>
                  </HeadlessMenuItem>
                </div>
              </HeadlessMenuItems>
            </transition>
          </HeadlessMenu>
        </ClientOnly>
      </div>

      <div
        class="grid gap-6 mt-12 md:grid-cols-2 xl:grid-cols-3"
        ref="itemsRef"
      >
        <CarCard
          v-for="model in modelsByType"
          :key="model.name"
          v-bind="model"
        />
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const greaterThanLg = breakpoints.greater("lg");
const smallerThanSm = breakpoints.smaller("sm");

const { data } = await useFetch("/api/cars/index");
const countries = computed(() => {
  return Object.keys(data.value.data).map((item, index) => ({
    name: Object.values(data.value.data)[index].name,
    code: item,
  }));
});

const currentCountry = ref(countries.value[0].code);

const updateCurrentCountry = (payload) => {
  currentCountry.value = payload.code;
};

const types = [
  { name: "Седаны", value: "sedan" },
  { name: "Кроссоверы", value: "crossover" },
  { name: "Минивэн", value: "minivan" },
  { name: "Хэтчбеки", value: "hatchback" },
  { name: "Купе", value: "coupe" },
];
const currentType = ref(types[0]);

const updateCurrentType = (payload) => {
  currentType.value = payload;
};

watch(currentCountry, () => {
  currentType.value = types[0];
});

const modelsByType = computed(() => {
  return data.value.data[currentCountry.value].models.filter(
    (item) => item.type === currentType.value.value
  );
});

const { $anime } = useNuxtApp();
const itemsRef = ref([]);

const { stop } = useIntersectionObserver(
  itemsRef,
  ([{ isIntersecting, target }]) => {
    if (isIntersecting) {
      $anime({
        targets: target.children,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        delay: $anime.stagger(200),
        complete: () => {
          stop();
        },
      });
    }
  }
);
</script>
