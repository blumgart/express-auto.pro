<template>
  <div class="bg-white rounded-xl">
    <div class="relative overflow-hidden rounded-xl group">
      <div class="h-72 md:h-[340px]">
        <img
          :src="`${config.public.backendUrl}${image}`"
          class="transition-all duration-300 group-hover:scale-[1.025] group-hover:blur-sm w-full h-full object-cover"
          alt=""
        />
      </div>

      <div
        :class="[
          'absolute flex items-center top-3 left-3 px-3 py-2 rounded-full',
          engineComp.bgColor,
        ]"
      >
        <img :src="engineComp.icon" class="w-4 h-4 mr-1" :alt="engine.name" />
        <span class="text-xs font-bold">{{ engine.name }}</span>
      </div>

      <button
        type="button"
        @click="open"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD600] rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 font-semibold px-7 py-4"
      >
        Оставить заявку
      </button>
    </div>
    <div class="px-3 py-4 md:px-6 md:pt-5 md:pb-4">
      <p class="flex items-center">
        <ins class="text-2xl font-bold no-underline md:text-3xl">
          {{ toCurrency(price.current) }}
        </ins>
        <del class="ml-4 text-[#C3C3C3] font-medium">
          {{ toCurrency(price.old) }}
        </del>
      </p>

      <h3 class="mt-2 font-medium uppercase">{{ name }}</h3>

      <div class="flex items-center mt-3 space-x-2">
        <span
          v-for="tech in techs"
          :key="tech"
          class="border border-solid border-[#C3C3C3] bg-[#F1F2F4] rounded-full px-3 py-1 text-xs font-bold"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import DieselIcon from "@/assets/images/icons/diesel.svg";
import HybridIcon from "@/assets/images/icons/hybrid.svg";
import LightningIcon from "@/assets/images/icons/lightning.svg";

const config = useRuntimeConfig();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
  techs: {
    type: Array,
    required: true,
  },
  engine: {
    type: Object,
    required: true,
  },
});

const { open } = useModal("callback");

const engineComp = computed(() => {
  let result = {
    icon: "",
    bgColor: "",
  };

  switch (props.engine.type) {
    case "diesel":
      result = {
        icon: DieselIcon,
        bgColor: "bg-[#FF8A00]",
      };
      break;
    case "hybrid":
      result = {
        icon: HybridIcon,
        bgColor: "bg-[#FFD600]",
      };
      break;
    case "electro":
      result = {
        icon: LightningIcon,
        bgColor: "bg-[#D6FC2D]",
      };
  }

  return result;
});
</script>
