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
      <h1 class="text-2xl text-primary-500 font-bold leading-normal mt-0 mb-2 text-emerald-800 text-center">
        {{ year }} ROAD ACCIDENT ANALYTICS
      </h1>
      <info-cards :population="populationData[year]" :totalAccidents="crashData[year]" :totalFatalities="fatalitiesData[year]"/>
      <line-chart-component :fatalities="fatalitiesArray" :totalAccidents="crashArray"/>
      <div class="lg:flex sm:grid items-center justify-between">
        <div class="bg-white w-full mr-2 mt-4 items-center justify-between">
          <donut-chart-component />
        </div>
        <div class="bg-white w-full lg:ml-2 mt-4 items-center justify-between">
          <note-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonutChartComponent from '~/components/DonutChartComponent.vue'
import InfoCards from '~/components/InfoCards.vue'
import LineChartComponent from '~/components/LineChartComponent.vue'
import NoteComponent from '~/components/NoteComponent.vue'
export default {
  components: { 
    InfoCards, 
    LineChartComponent, 
    DonutChartComponent, 
    NoteComponent 
  },

  async asyncData({app, params, error}) {
    let crashArray = []
    let fatalitiesArray = []
    let crashData = {}
    let fatalitiesData = {}
    let populationData = {}

    try {
      let annuRef = app.$fire.firestore.collection('annual-stats');
      let snapshot = await annuRef.get();
      snapshot.forEach(doc => {
        if(doc.id == "crashes"){
          crashData = doc.data()
          for(var key in doc.data()){
            crashArray.push(doc.data()[key])
          }
        }else if(doc.id == "fatalities") {
          fatalitiesData = doc.data()
          for(var key in doc.data()){
            fatalitiesArray.push(doc.data()[key])
          }
        }else if(doc.id == "population") {
          populationData = doc.data()
        }
      });
  
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }
    return {
      crashArray, 
      fatalitiesArray,
      crashData,
      fatalitiesData,
      populationData
    }
  },
  data(){
    return{
      year: 2019
    }
  },
  methods: {
    switchTo2019(){
      this.year = 2019
    }
    
  }

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