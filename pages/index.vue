<template>
  <div class="flex min-h-screen bg-primary-50">
    <div class="bg-white py-4 px-3 md:py-6 md:px-8">
      <nav>
        <ul class="py-4">
          <li class="py-2">
            <a class="nav-link" v-on:click="switchTo2019()">
              <!-- icon svg -->
            </a>
          </li>
          <li class="py-2" v-on:click="switchTo2018()">
            <a class="nav-link">
              <!-- icon svg -->
            </a>
          </li>
          <li class="py-2">
            <a class="nav-link">
              <!-- icon svg -->
            </a>
          </li>
          <li class="py-2">
            <a class="nav-link">
              <!-- icon svg -->
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex-auto h-screen overflow-y-auto p-6">
      <h1 class="text-2xl text-primary-500 font-bold leading-normal mt-0 mb-2 text-emerald-800 text-center">
        {{ year }} ROAD ACCIDENT ANALYTICS
      </h1>
      <info-cards :population="population" :totalAccidents="totalAccidents" :totalFatalities="totalFatalities"/>
      <line-chart-component :fatalities="fatalitiesArray" :totalAccidents="crashArray"/>
      <div class="lg:flex sm:grid items-center justify-between">
        <div class="bg-white w-full mr-2 mt-4 items-center justify-between">
          <donut-chart-component :fatalities="totalFatalities" :minorInjur="minorInjury" :seriousInjur="seriousInjury"/>
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
    let minorInjuryData = {}
    let seriousInjuryData = {}

    let totalAccidents = 0
    let totalFatalities = 0
    let minorInjury = 0
    let seriousInjury = 0
    let population = 0
    let year = 2019

    try {
      let annuRef = app.$fire.firestore.collection('annual-stats');
      let snapshot = await annuRef.get();
      snapshot.forEach(doc => {
        if(doc.id == "crashes"){
          crashData = doc.data()
          totalAccidents = crashData[year]
          for(var key in doc.data()){
            crashArray.push(doc.data()[key])
          }
        }else if(doc.id == "fatalities") {
          fatalitiesData = doc.data()
          totalFatalities = fatalitiesData[year]
          for(var key in doc.data()){
            fatalitiesArray.push(doc.data()[key])
          }
        }else if(doc.id == "population") {
          populationData = doc.data()
          population = populationData[year]
        }else if(doc.id == "minor-injuries") {
          minorInjuryData = doc.data()
          minorInjury = minorInjuryData[year]
        }else if(doc.id == "serious-injury") {
          seriousInjuryData = doc.data()
          seriousInjury = seriousInjuryData[year]
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
      populationData,
      year,
      totalAccidents,
      totalFatalities,
      population,
      minorInjuryData,
      minorInjury,
      seriousInjury,
      seriousInjuryData
    }
  },
  methods: {
    switchTo2019(){
      this.yearSwitcher(2019)
    },
    switchTo2018(){
      this.yearSwitcher(2018) 
    },
    switchTo2017(){
      this.yearSwitcher(2017)
    },
    switchTo2016(){
      this.yearSwitcher(2016)
    },
    yearSwitcher(year){
      this.year = year
      this.totalAccidents = this.crashData[year]
      this.totalFatalities = this.fatalitiesData[year]
      this.population = this.populationData[year]
      this.minorInjury = this.minorInjuryData[year]
      this.seriousInjury = this.seriousInjuryData[year]
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