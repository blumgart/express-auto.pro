<template>
  <SectionWrapper class="scroll-mt-10" id="about">
    <SectionHeading text="Преимущества компании" />

    <div
      class="grid gap-4 mt-5 md:gap-5 md:mt-10 lg:grid-cols-2 lg:gap-8 xl:gap-16 xl:grid-cols-3"
      ref="listRef"
    >
      <div
        v-for="item in list"
        :key="item.heading"
        :class="[
          `relative flex flex-col lg:h-64 group 
          lg:before:absolute 
          lg:before:-inset-2 
          lg:before:bg-white 
          lg:before:shadow 
          lg:before:rotate-[2deg] 
          lg:before:z-[-2] 
          lg:before:rounded-xl 
          lg:before:scale-75 
          lg:before:duration-200 
          lg:before:transition-transform 
          lg:hover:before:scale-100 
          lg:after:absolute 
          lg:after:-inset-2 
          lg:after:bg-white 
          lg:after:z-[-2] 
          lg:after:rounded-xl 
          lg:after:rotate-[-2deg] 
          lg:after:scale-75 
          lg:after:duration-300 
          lg:after:transition-transform 
          lg:after:shadow
          lg:hover:after:scale-100 `,
        ]"
      >
        <div
          class="flex flex-col flex-1 p-4 overflow-hidden bg-white shadow md:flex-row md:p-5 lg:px-8 lg:py-6 rounded-xl"
        >
          <div
            class="shrink-0 lg:absolute top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-8 flex items-center justify-center bg-[#FFD600] h-8 w-8 md:h-16 md:w-16 mb-6 md:mb-0 lg:mb-20 rounded-full [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-9 md:[&>svg]:h-9 lg:group-hover:opacity-0 lg:transition-opacity lg:duration-200"
            v-html="item.icon"
          ></div>

          <div
            class="ml-0 md:ml-5 lg:ml-0 lg:transition-transform lg:duration-300 lg:translate-y-36 lg:group-hover:translate-y-0"
          >
            <h3 class="font-medium md:text-xl xl:text-2xl">
              {{ item.heading }}
            </h3>
            <p class="md:text-lg text-[#C3C3C3]">{{ item.subheading }}</p>
            <div
              class="mt-2 md:mt-4 lg:transition-opacity lg:duration-300 lg:opacity-0 lg:group-hover:opacity-100 text-[#868686] leading-5 text-sm xl:text-base"
            >
              <p>
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import icon1 from "~/assets/images/icons/advantages-1.svg?raw";
import icon2 from "~/assets/images/icons/advantages-2.svg?raw";
import icon3 from "~/assets/images/icons/advantages-3.svg?raw";
import icon4 from "~/assets/images/icons/advantages-4.svg?raw";
import icon5 from "~/assets/images/icons/advantages-5.svg?raw";
import icon6 from "~/assets/images/icons/advantages-6.svg?raw";

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

const list = [
  {
    icon: icon1,
    heading: "Фиксированная комиссия",
    subheading: "Никаких переплат",
    text: "Мы берем на себя все задачи по приобретению, оформлению, таможенном оформлении и доставке автомобиля в ваш город.",
  },
  {
    icon: icon2,
    heading: "Отсутствие рисков",
    subheading: "Обеспечим безопасность",
    text: "На время транспортировки вашего автомобиля мы берем на себя все риски.",
  },
  {
    icon: icon3,
    heading: "Дополнительный сервис",
    subheading: "Полный комплект",
    text: "Мы предоставим вам все необходимые услуги по обслуживанию вашего автомобиля, включая покупку запчастей, расходных материалов и аксессуаров.",
  },
  {
    icon: icon4,
    heading: "Юридическая чистота",
    subheading: "Без пробега по РФ",
    text: "Автомобиль не имеет пробега по территории РФ, вы являетесь его первым владельцем.",
  },
  {
    icon: icon5,
    heading: "Под ключ",
    subheading: "Помощь во всем",
    text: "Мы берем на себя все задачи по приобретению, оформлению, таможенном оформлении и доставке автомобиля в ваш город.",
  },
  {
    icon: icon6,
    heading: "Честная цена",
    subheading: "Без накруток",
    text: "Вы получаете автомобиль, в цене которого нет никаких дополнительных комиссий или наценок со стороны продавцов, дилеров или автосалонов.",
  },
];
</script>
