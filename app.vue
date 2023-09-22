<template>
  <div class="bg-[#F1F2F4]">
    <div class="relative">
      <TheHeader />

      <TheHero />
    </div>

    <TheAutos />
    <ThePartners />
    <TheAdvantages />
    <TheSchemeOfWork />
    <TheReviews />

    <TheFooter />

    <ModalCallback />
  </div>
</template>

<script setup>
useHead({
  title: "Автомобили под заказ - Express Auto",
});
</script>
