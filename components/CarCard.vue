<template>
  <div class="bg-white rounded-xl">
    <div class="relative overflow-hidden rounded-xl group">
      <div class="h-72 md:h-[340px]">
        <img
          src="https://placehold.co/533x340"
          class="transition-all duration-300 group-hover:scale-[1.025] group-hover:blur-sm w-full h-full object-cover"
          alt=""
        />
      </div>

      <div
        class="absolute flex items-center top-3 left-3 px-3 py-2 rounded-full bg-[#FFD600]"
      >
        <img
          src="@/assets/images/icons/lightning.svg"
          class="w-4 h-4 mr-1"
          alt="Электрокар"
        />
        <span class="text-xs font-bold">Электрокар</span>
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
          9 100 000 ₽
        </ins>
        <del class="ml-4 text-[#C3C3C3] font-medium"> 9 500 000 ₽ </del>
      </p>

      <h3 class="mt-2 font-medium uppercase">ZEEKR 001</h3>

      <div class="flex items-center mt-3 space-x-2">
        <span
          class="border border-solid border-[#C3C3C3] bg-[#F1F2F4] rounded-full px-3 py-1 text-xs font-bold"
          >544 л.с.</span
        >
        <span
          class="border border-solid border-[#C3C3C3] bg-[#F1F2F4] rounded-full px-3 py-1 text-xs font-bold"
          >2022</span
        >
        <span
          class="border border-solid border-[#C3C3C3] bg-[#F1F2F4] rounded-full px-3 py-1 text-xs font-bold"
          >1024 Км.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const { open } = useModal("callback");
</script>
