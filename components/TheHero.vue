<template>
  <div class="flex flex-col justify-end h-screen bg-gray-200">
    <DevOnly>
      <button
        type="button"
        @click="restart"
        class="absolute bottom-4 right-4 z-[12] text-white text-sm"
      >
        RESTART
      </button>
    </DevOnly>

    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-500"
      enter-to-class="opacity-100"
    >
      <div
        class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black to-black/40 z-[1]"
        v-if="ended"
      ></div>
    </Transition>

    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-500"
      enter-to-class="opacity-100"
    >
      <img
        v-if="ended"
        src="/images/hero.png"
        class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none translate-y-2 scale-[0.975] z-[2]"
      />
    </Transition>

    <div
      class="absolute top-24 inset-x-0 max-w-[1640px] px-4 mx-auto overflow-hidden opacity-0 z-[1]"
      ref="expressRef"
    >
      <img src="/images/hero-express.png" />
    </div>

    <div class="w-full max-w-[1640px] px-4 mx-auto">
      <div class="flex relative z-[10]">
        <div class="flex flex-col items-start opacity-0" ref="headingRef">
          <span
            class="inline-block px-9 py-3 text-[72px]/[1] font-light rounded-tl-full rounded-r-full bg-[#FFD600] uppercase tracking-tighter"
          >
            Автомобили
          </span>
          <span
            class="inline-block px-9 py-3 text-[72px]/[1] font-light rounded-bl-full rounded-r-full bg-[#FFD600] uppercase -mt-5 tracking-tighter"
          >
            под заказ
          </span>
        </div>

        <ul class="flex flex-col items-start mt-2 ml-4 space-y-1">
          <li
            v-for="country in countries"
            :key="country"
            ref="countriesRef"
            class="rounded-full border border-solid border-white px-3 py-0.5 text-white bg-black/60 opacity-0"
          >
            {{ country }}
          </li>
        </ul>
      </div>

      <div
        class="relative bg-[#6C6C6C]/20 z-[10] rounded-full mt-4 mb-4 opacity-0"
        ref="consultationRef"
      >
        <div class="relative flex items-center justify-between py-2.5 px-9">
          <span class="text-4xl text-white uppercase">Консультация</span>

          <form class="flex items-center text-white">
            <div class="grid grid-cols-2 pr-48 gap-x-4 gap-y-2">
              <div>
                <input
                  type="text"
                  class="w-full bg-transparent focus:outline-none border-b border-solid border-[#868686] text-sm"
                  placeholder="Имя"
                />
              </div>
              <div>
                <input
                  type="text"
                  class="w-full bg-transparent focus:outline-none border-b border-solid border-[#868686] text-sm"
                  placeholder="Телефон"
                />
              </div>
              <div class="col-span-2">
                <label class="inline-flex items-center">
                  <input type="checkbox" />
                  <span class="ml-1 text-xs">
                    <span class="text-[#868686]">
                      Нажимая на кнопку, вы соглашаетесь с политикой обработки
                    </span>
                    <a href="#" class="text-[#C3C3C3]">персональных данных</a>
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="bg-[#FFD600] text-black rounded-full px-8 absolute inset-y-0 right-0 font-medium"
            >
              Связаться со мной
            </button>
          </form>
        </div>
      </div>
    </div>

    <video
      ref="videoRef"
      class="absolute top-0 left-0 object-cover w-full h-full pointer-events-none"
    ></video>
  </div>
</template>

<script setup>
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

  restart();
});

const countries = ["ОАЭ", "Корея", "Китай", "Европа", "Япония"];
</script>
