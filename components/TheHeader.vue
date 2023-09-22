<template>
  <header class="absolute inset-x-0 top-0 z-10 pt-4">
    <div class="max-w-[1640px] mx-auto px-4">
      <div class="flex items-center justify-between">
        <a href="#">
          <img src="/logo-white.svg" alt="Express Auto" class="w-16 h-auto sm:w-20 sm:h-10 lg:w-[124px] lg:h-14" />
        </a>

        <nav class="items-center hidden px-2 py-5 border border-white border-solid rounded-full lg:flex lg:space-x-2 2xl:space-x-10 2xl:px-9">
          <a v-for="anchor in anchors" :key="anchor.href" :href="anchor.href" class="font-medium text-white">
            {{ anchor.name }}
          </a>
        </nav>

        <ul class="flex items-center space-x-3">
          <li v-for="social in socials" :key="social.name">
            <a :href="social.url" class="flex items-center justify-center w-8 h-8 bg-[#FFD600] rounded-full">
              <span :class="['w-4 h-4', social.icon]"></span>
            </a>
          </li>
          <li class="flex-shrink-0">
            <a :href="`tel:${rawPhone(contacts.phone)}`" class="hidden xl:block">
              <span class="text-base font-semibold text-white xl:text-xl">{{ contacts.phone }}</span>
            </a>

            <a :href="`tel:${rawPhone(contacts.phone)}`" class="flex items-center justify-center w-8 h-8 bg-[#FFD600] rounded-full xl:hidden">
              <span class="w-4 h-4 xl:hidden i-heroicons-phone-solid"></span>
            </a>
          </li>
          <li class="hidden sm:block">
            <button
              type="button"
              @click="open"
              class="py-4 font-semibold text-white border border-white border-solid rounded-full px-7 lg:py-5 lg:px-2 xl:px-7"
            >
              Связаться с нами
            </button>
          </li>

          <li>
            <button type="button" class="py-4 font-semibold text-white border border-white border-solid rounded-full px-7 lg:hidden">Меню</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
const { contacts, socials } = useAppConfig();
const { open } = useModal("callback");

const anchors = [
  { name: "Авто в наличии", href: "#stock" },
  { name: "Страны партнеры", href: "#partners" },
  { name: "Схема работы", href: "#how-it-work" },
  { name: "О нас", href: "#about" },
  { name: "Отзывы", href: "#reviews" },
];
</script>
