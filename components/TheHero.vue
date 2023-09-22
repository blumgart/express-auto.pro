<template>
  <ClientOnly>
    <div class="relative flex flex-col justify-end lg:h-screen min-h-[756px] lg:min-h-0 bg-[#131313]">
      <DevOnly>
        <button type="button" @click="restart" class="absolute bottom-4 right-4 z-[12] text-white text-sm">RESTART</button>
      </DevOnly>

      <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-500" enter-to-class="opacity-100">
        <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black to-black/40 z-[1]" v-if="ended"></div>
      </Transition>

      <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-500" enter-to-class="opacity-100">
        <img
          v-if="ended"
          src="/images/hero.png"
          class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none translate-y-2 scale-[0.975] z-[2]"
        />
      </Transition>

      <div v-if="smallerThanLg" class="absolute inset-0 z-[1]">
        <img src="@/assets/images/hero-bg.jpg" class="w-full h-auto translate-y-20" />
      </div>

      <div v-if="lgAndLarger" class="absolute top-24 inset-x-0 max-w-[1640px] px-4 mx-auto overflow-hidden lg:opacity-0 z-[1]" ref="expressRef">
        <img src="/images/hero-express.png" />
      </div>

      <div class="w-full max-w-[1640px] px-4 mx-auto">
        <div class="flex flex-col sm:flex-row relative z-[10]">
          <div class="flex flex-col items-start lg:opacity-0" ref="headingRef">
            <span
              class="inline-block px-5 sm:px-9 py-2 lg:py-3 text-[35px]/[1] sm:text-[55px]/[1] lg:text-[72px]/[1] font-light rounded-tl-full rounded-r-full bg-[#FFD600] uppercase tracking-tighter"
            >
              Автомобили
            </span>
            <span
              class="inline-block px-5 sm:px-9 py-2 lg:py-3 text-[35px]/[1] sm:text-[55px]/[1] lg:text-[72px]/[1] font-light rounded-bl-full rounded-r-full bg-[#FFD600] uppercase -mt-3 sm:-mt-4 lg:-mt-5 tracking-tighter"
            >
              под заказ
            </span>
          </div>

          <ul class="items-start mt-2 space-y-1 sm:ml-4 columns-2 lg:flex lg:flex-col">
            <li
              v-for="country in countries"
              :key="country"
              ref="countriesRef"
              class="rounded-full border border-solid border-white px-3 py-0.5 text-white bg-black/60 lg:opacity-0 uppercase"
            >
              {{ country }}
            </li>
          </ul>
        </div>

        <div class="relative sm:bg-[#6C6C6C]/20 z-[10] sm:rounded-full mt-7 sm:mt-4 mb-4 lg:opacity-0" ref="consultationRef">
          <div class="relative items-center justify-between py-2.5 px-9 contents sm:flex">
            <span class="hidden text-4xl text-white uppercase lg:block">Консультация</span>

            <form class="flex flex-col items-center text-white sm:flex-row">
              <div class="grid w-full sm:pr-48 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-2 sm:w-auto">
                <div>
                  <input
                    type="text"
                    class="w-full sm:bg-transparent focus:outline-none sm:border-b sm:border-solid sm:border-[#868686] text-sm py-3 px-5 sm:p-0 rounded-full sm:rounded-none bg-[#3D3D3D]/[60]"
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    class="w-full sm:bg-transparent focus:outline-none sm:border-b sm:border-solid sm:border-[#868686] text-sm py-3 px-5 sm:p-0 rounded-full sm:rounded-none bg-[#3D3D3D]/[60]"
                    placeholder="Телефон"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="inline-flex items-center">
                    <input type="checkbox" />
                    <span class="ml-1 text-[10px]/[1] lg:text-xs">
                      <span class="text-[#868686]"> Нажимая на кнопку, вы соглашаетесь с политикой обработки </span>
                      <a href="#" class="text-[#C3C3C3]">персональных данных</a>
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="bg-[#FFD600] text-black rounded-full px-8 sm:absolute sm:inset-y-0 sm:right-0 font-medium mt-6 sm:mt-0 w-full sm:w-auto py-5 sm:py-0"
              >
                Связаться со мной
              </button>
            </form>
          </div>
        </div>
      </div>

      <video v-if="lgAndLarger" ref="videoRef" class="absolute top-0 left-0 object-cover w-full h-full pointer-events-none"></video>
    </div>
  </ClientOnly>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndLarger = breakpoints.greaterOrEqual("lg");
const smallerThanLg = breakpoints.smaller("lg");

const { $anime } = useNuxtApp();

const videoRef = ref(null);
const expressRef = ref(null);
const headingRef = ref(null);
const countriesRef = ref([]);
const consultationRef = ref([]);

const { currentTime, volume, playing, ended } = useMediaControls(videoRef, {
  src: "/hero.mp4",
});

const restart = () => {
  $anime({
    targets: expressRef.value,
    opacity: 0,
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  $anime({
    targets: headingRef.value,
    opacity: 0,
  });

  $anime({
    targets: countriesRef.value,
    opacity: 0,
  });

  $anime({
    targets: consultationRef.value,
    opacity: 0,
  });

  volume.value = 0;
  currentTime.value = 0;
  playing.value = true;
};

whenever(ended, () => {
  const tl = $anime.timeline();

  tl.add({
    targets: expressRef.value,
    opacity: 1,
    keyframes: Array(11)
      .fill()
      .map((_, i) => ({
        clipPath: `polygon(
          0% 100%, 
          100% 100%, 
          100% ${100 - i * 10}%, 
          0% ${100 - i * 10}%
        )`,
      })),
    duration: 1000,
    easing: "linear",
  })
    .add(
      {
        targets: headingRef.value,
        opacity: [0, 1],
        translateY: ["10px", 0],
        duration: 2000,
      },
      "-=500"
    )
    .add(
      {
        targets: countriesRef.value,
        opacity: [0, 1],
        translateY: ["10px", 0],
        duration: 1000,
        delay: $anime.stagger(200),
      },
      "-=2000"
    )
    .add(
      {
        targets: consultationRef.value,
        opacity: [0, 1],
        translateY: ["10px", 0],
        duration: 1000,
      },
      "-=1000"
    );
});

onMounted(async () => {
  await nextTick();

  if (lgAndLarger.value) {
    restart();
  }
});

const countries = ["ОАЭ", "Корея", "Китай", "Европа", "Япония"];
</script>
