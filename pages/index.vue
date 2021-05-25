<template>

  <div class="flex min-h-screen bg-primary-50">
    <div class="bg-white py-4 px-3 md:py-6 md:px-8">
      <nav>
        <ul class="py-4">
          <li class="py-2">
            <nuxt-link to="/" class="nav-link">
              <!-- icon svg -->
            </nuxt-link>
          </li>
          <li class="py-2">
            <nuxt-link to="/styleguide" class="nav-link">
              <!-- icon svg -->
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex-auto h-screen overflow-y-auto p-6">
      <info-cards />
      <line-chart-component />
      <donut-chart-component />
    </div>
  </div>
</template>

<script>
import DonutChartComponent from '~/components/DonutChartComponent.vue'
import InfoCards from '~/components/InfoCards.vue'
import LineChartComponent from '~/components/LineChartComponent.vue'
export default {
  components: { InfoCards, LineChartComponent, DonutChartComponent },
  
}
</script>

<style scoped>
.nav-link {
  @apply transition-all duration-1000 ease-in-out block w-10 h-10 bg-white text-primary-400 rounded-full flex items-center justify-center shadow-inner;

  @screen md {
    @apply w-12 h-12;
  }
}
.nav-link:hover,
.nuxt-link-exact-active {
  @apply bg-primary-400 text-white shadow-lg;
}
</style>