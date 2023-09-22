<template>
  <div class="relative overflow-hidden">
    <h2
      class="relative inline-flex text-lg sm:text-xl lg:text-4xl uppercase border border-solid border-[#868686] px-5 py-2 rounded-full overflow-hidden"
      ref="headingRef"
    >
      <span
        v-for="i in 3"
        :key="i"
        :class="[
          'absolute left-0 w-full h-1/3 bg-black z-[1]',
          { 'top-0': i === 1, 'top-1/3': i === 2, 'top-2/3': i === 3 },
        ]"
        ref="coverRef"
      ></span>

      {{ text }}
    </h2>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const { $anime } = useNuxtApp();

const coverRef = ref([]);
const headingRef = ref(null);

useIntersectionObserver(coverRef, ([{ isIntersecting, target }]) => {
  if (isIntersecting) {
    $anime
      .timeline({})
      .add({
        targets: coverRef.value,
        left: [0, "100%"],
        easing: "linear",
        duration: 500,
        delay: $anime.stagger(100),
      })
      .add(
        {
          targets: headingRef.value,
          opacity: [0, 1],
          scale: [0.75, 1],
          easing: "linear",
          duration: 500,
        },
        "-=1000"
      );
  }
});
</script>
