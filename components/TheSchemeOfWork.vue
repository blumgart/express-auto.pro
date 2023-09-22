<template>
  <SectionWrapper class="scroll-mt-10" id="how-it-work">
    <div
      class="relative z-[1] grid gap-y-4 md:grid-cols-2 md:gap-x-5 md:gap-y-10 lg:gap-x-11 lg:gap-y-28 [counter-reset:section]"
      ref="sectionRef"
    >
      <div
        v-for="(item, itemIndex) in list"
        :key="item.heading"
        ref="itemsRef"
        :class="[
          `
          [counter-increment:section] relative 
          md:before:absolute 
          md:before:-inset-2 
          md:before:bg-white 
          md:before:shadow 
          md:before:rotate-[2deg] 
          md:before:z-[-1] 
          md:before:rounded-xl 
          md:before:scale-75 
          md:before:duration-200 
          md:before:transition-transform 
          md:hover:before:scale-100 
          md:after:absolute 
          md:after:-inset-2 
          md:after:bg-white 
          md:after:z-[-2] 
          md:after:rounded-xl 
          md:after:rotate-[-2deg] 
          md:after:scale-75 
          md:hover:after:scale-100 
          md:after:duration-300 
          md:after:transition-transform 
          md:after:shadow`,
          { 'md:row-start-2': itemIndex === 1 },
          { 'md:row-start-3': itemIndex === 2 },
          { 'md:row-start-4': itemIndex === 3 },
          { 'md:row-start-5': itemIndex === 4 },
          { 'md:col-start-2': itemIndex % 2 !== 0 },
        ]"
      >
        <div
          class="p-5 lg:p-8 bg-white shadow rounded-xl before:inline-flex before:proportional-nums before:py-2 before:px-5 before:content-['0'_counter(section)] before:text-2xl/none lg:before:text-4xl/none before:border before:border-[#868686] before:rounded-full before:transition before:duration-200 hover:before:text-[#FFD600] hover:before:bg-black"
        >
          <h2
            v-if="itemIndex === 0"
            class="inline-flex px-5 py-2 uppercase text-2xl/none lg:text-4xl/none border border-[#868686] rounded-full"
          >
            Схема работы
          </h2>

          <div class="space-y-2 md:space-y-4 mt-14 lg:mt-24">
            <p class="text-xl font-medium md:text-2xl">{{ item.heading }}</p>
            <p class="text-sm lg:text-lg text-[#868686]">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- bg-[url('/schema-bg.svg')] bg-[55%_25%] bg-no-repeat -->
      <!-- class="absolute w-4/5 h-4/5 pointer-events-none z-[-3] top-28 left-48 [&>svg]:w-full [&>svg]:h-full" -->
      <div
        class="hidden md:block absolute inset-0 pointer-events-none z-[-3] [&>svg]:w-full [&>svg]:h-full"
        ref="pathRef"
        v-html="schemaBg"
      ></div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import schemaBg from "/test.svg?raw";

const { $anime } = useNuxtApp();
const sectionRef = ref(null);
const itemsRef = ref([]);
const pathRef = ref(null);

const { stop: stopSection } = useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting, target }]) => {
    if (isIntersecting) {
      $anime({
        targets: pathRef.value.querySelectorAll("path"),
        strokeDashoffset: [$anime.setDashoffset, 0],
        strokeWidth: 12,
        duration: 3000,
        easing: "linear",
        complete: () => {
          stopSection();
        },
      });
    }
  }
);

const { stop } = useIntersectionObserver(
  itemsRef,
  ([{ isIntersecting, target }]) => {
    if (isIntersecting) {
      $anime({
        targets: target,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        complete: () => {
          stop();
        },
      });
    }
  }
);

const list = [
  {
    heading: "Заявка",
    text: "Вы можете написать нам, позвонить или оставить заявку на сайте. Мы с радостью ответим на все ваши вопросы и расскажем про все этапы покупки.",
  },
  {
    heading: "Двусторонний договор",
    text: "После подписания двустороннего договора вы вносите гарантийный залог банковским переводом на расчетный счет компании.",
  },
  {
    heading: "Подбор и покупка авто",
    text: "Вы можете совершенно не разбираться в марках автомобилей. Наши менеджеры подберут самый оптимальный вариант под ваши задачи и бюджет.",
  },
  {
    heading: "Оплата услуги",
    text: "В течение трёх дней вы оплачиваете расходы по выставленному счету в удобной для вас валюте в любом банке. Далее мы готовим авто к отправке в РФ.",
  },
  {
    heading: "Таможня и передача авто",
    text: "Когда авто приезжает в РФ, вы оплачиваете пошлину и комиссию за работу компании. Далее автомобиль можно забрать самостоятельно, или мы организуем доставку в ваш город.",
  },
];
</script>
