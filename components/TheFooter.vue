<template>
  <footer class="bg-white relative rounded-t-[40px] py-10">
    <div class="max-w-[1646px] px-4 mx-auto">
      <div class="grid grid-cols-12 gap-x-5">
        <div class="col-span-7">
          <div class="flex justify-between">
            <div class="max-w-sm">
              <p
                class="text-[58px]/[1] uppercase"
                v-html="contacts.address"
              ></p>
            </div>

            <div class="shrink-0">
              <ul class="space-y-6">
                <li class="flex flex-col">
                  <a
                    :href="`tel:${rawPhone(contacts.phone)}`"
                    class="text-2xl font-bold"
                  >
                    {{ contacts.phone }}
                  </a>
                  <span class="text-[#868686] font-medium mt-1">
                    Телефон для консультирования
                  </span>
                </li>
                <li class="flex flex-col">
                  <a
                    :href="`mailto:${contacts.email}`"
                    class="text-2xl font-bold"
                  >
                    {{ contacts.email }}
                  </a>
                  <span class="text-[#868686] font-medium mt-1">
                    Почта для запросов
                  </span>
                </li>
                <li class="flex items-center space-x-3">
                  <a
                    v-for="social in socials"
                    :key="social.name"
                    :href="social.url"
                    class="inline-flex items-center justify-center w-8 h-8 bg-[#FFD600] rounded-full"
                    :aria-label="social.name"
                  >
                    <span :class="['w-4 h-4', social.icon]"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-span-5">
          <ClientOnly>
            <YandexMap
              :coordinates="[32, 50]"
              class="h-64 overflow-hidden rounded-[20px]"
            >
              <YandexMarker
                :marker-id="1"
                :coordinates="[32, 50]"
              ></YandexMarker>
            </YandexMap>
          </ClientOnly>
        </div>
      </div>

      <div class="grid grid-cols-12 mt-3 gap-x-5">
        <div class="col-span-7">
          <small class="text-sm text-[#868686]">
            &copy; {{ siteName }}, {{ year }}
          </small>
        </div>

        <div class="col-span-5">
          <div class="flex items-center justify-between">
            <a href="#" class="text-sm text-[#868686]">
              Политика конфиденциальности
            </a>
            <a href="#" class="inline-flex items-center">
              <span class="text-sm text-[#868686]">Разработка сайта:</span>
              <img
                src="/serptop.svg"
                class="w-24 translate-y-0.5 ml-2"
                alt="Разработка сайта - SerpTop"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { YandexMap, YandexMarker } from "vue-yandex-maps";

const { siteName, contacts, socials } = useAppConfig();
const year = useDateFormat(useNow(), "YYYY");
</script>
