<template>
  <SectionWrapper class="scroll-mt-10" id="partners">
    <SectionHeading text="Страны-партнеры" />

    <div
      class="grid sm:grid-cols-2 mt-5 lg:mt-10 gap-5 lg:gap-x-16 lg:gap-y-14 sm:first:[&_div]:col-span-2"
      ref="listRef"
    >
      <div
        v-for="item in list"
        :key="item.heading"
        :class="[
          'flex flex-col items-start justify-between h-64 p-4 md:p-5 lg:py-5 bg-white lg:px-7 rounded-xl bg-cover bg-no-repeat bg-bottom lg:bg-center',
        ]"
        :style="{ 'background-image': `url(${getImage(item.images)})` }"
      >
        <div class="max-w-xs">
          <h3 class="text-lg font-medium sm:text-xl md:text-2xl">
            {{ item.heading }}
          </h3>
          <p class="mt-2 text-sm leading-5 md:text-base">{{ item.text }}</p>
        </div>

        <button
          type="button"
          @click="open"
          class="bg-[#FFD600] px-7 py-4 font-semibold rounded-full"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import China from "@/assets/images/partners/china.png";
import ChinaMd from "@/assets/images/partners/china-md.jpg";
import UAE from "@/assets/images/partners/uae.png";
import UAEMd from "@/assets/images/partners/uae-md.jpg";
import Korea from "@/assets/images/partners/korea.png";
import KoreaMd from "@/assets/images/partners/korea-md.jpg";
import Europe from "@/assets/images/partners/europe.png";
import EuropeMd from "@/assets/images/partners/europe-md.jpg";
import Japan from "@/assets/images/partners/japan.png";
import JapanMd from "@/assets/images/partners/japan-md.jpg";

const { open } = useModal("callback");

const { $anime } = useNuxtApp();
const listRef = ref([]);

const { stop } = useIntersectionObserver(
  listRef,
  ([{ isIntersecting, target }]) => {
    if (isIntersecting) {
      $anime({
        targets: target.children,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1500,
        delay: $anime.stagger(200),
        complete: () => {
          stop();
        },
      });
    }
  }
);

const breakpoints = useBreakpoints(breakpointsTailwind);
const smallerThanLg = breakpoints.smaller("lg");

const getImage = (images) => {
  if (smallerThanLg.value) {
    return images["tablet"];
  } else {
    return images["desktop"];
  }
};

const list = [
  {
    heading: "Автомобили из Китая",
    text: "Какой-то текст касательно этой страны у каждой он уникальный",
    images: {
      desktop: China,
      tablet: ChinaMd,
    },
  },
  {
    heading: "Автомобили из ОАЭ",
    text: "Какой-то текст касательно этой страны у каждой он уникальный",
    images: {
      desktop: UAE,
      tablet: UAEMd,
    },
  },
  {
    heading: "Автомобили из Кореи",
    text: "Какой-то текст касательно этой страны у каждой он уникальный",
    images: {
      desktop: Korea,
      tablet: KoreaMd,
    },
  },
  {
    heading: "Автомобили из Европы",
    text: "Какой-то текст касательно этой страны у каждой он уникальный",
    images: {
      desktop: Europe,
      tablet: EuropeMd,
    },
  },
  {
    heading: "Автомобили из Японии",
    text: "Какой-то текст касательно этой страны у каждой он уникальный",
    images: {
      desktop: Japan,
      tablet: JapanMd,
    },
  },
];
</script>
