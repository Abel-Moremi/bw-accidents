<template>
    <div class="pt-6 w-full md:w-full">
        <section class="w-full ">
            <header class="pb-4">
                <h2 class="text-xl">
                    Statistics
                </h2>
            </header> 
            <div class="flex flex-wrap md:-mr-6">
                <div v-for="(value, index) in infoData" :key="index" class="w-full md:w-1/3 md:pr-6 pb-4">
                    <div class="rounded-lg p-8 bg-white text-primary-500 hover:bg-primary-300 hover:text-white">
                        <strong class="text-xl">{{ value }}</strong> 
                        <p>{{ index }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    props: {
        population: {
            type: Number,
            required: true
        },
        totalAccidents: {
            type: Number,
            required: true
        },
        totalFatalities: {
            type: Number,
            required: true 
        }
    },
    data(){
        return{
            infoData: {
                "Population" : this.population.toLocaleString(),
                "Total Accidents" : this.totalAccidents.toLocaleString(),
                "Fatalities": this.totalFatalities, 
            }
        }
    }
}
</script>