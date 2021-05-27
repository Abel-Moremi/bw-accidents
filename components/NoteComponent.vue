<template> 
    <section class="flex shadow">
    <!-- card container -->
        <div class="rounded overflow-hidden m-4 sm:flex bg-white">  
            <!-- card-content -->
            <div class="px-6 py-4">
                <h2 class="mb-2 font-black">
                    More Statistics!
                </h2>
                <p class="mb-4 text-grey-dark text-sm">
                    For the year {{ year }}, of the {{ totalAccidents }} accidents that occured {{ deathPercentage }}% resulted in a death, 
                    while {{ minorPercentage }}% resulted in minor injuries and {{ seriousPercentage }}% reulted in serious. Although
                    thsese margings are small every life is important. We should all aim to drive 
                    safely.
                    <br>
                    All the data displayed is sourced from
                    <a href="https://www.statsbots.org.bw/" target="_blank" class="font-bold text-primary-300"> statistics Botswana</a> 
                    and Annual reports from <a href="https://www.statsbots.org.bw/" target="_blank" class="font-bold text-primary-300"> MVA Fund</a>.
                    <br>
                    <br>
                    Made with love by <a href="https://github.com/Abel-Moremi" target="_blank" class="font-bold text-primary-300">Abel Moremi</a> 
                </p> 
            </div>
        </div>
    </section>
</template>
<script>
export default {
     props: {
        year: {
            type: Number,
            required: true
        },
        seriousInjur: {
            type: Number,
            required: true
        },
        fatalities: {
            type: Number,
            required: true
        },
        minorInjury: {
            type: Number,
            required: true
        },
        totalAccidents: {
            type: Number,
            required: true
        }
    },
    computed: {
        deathPercentage: function () {
            return Math.round((this.fatalities / this.totalAccidents) * 100)
        },
        minorPercentage: function () {
            return Math.round((this.minorInjury / this.totalAccidents) * 100)
        },
        seriousPercentage: function () {
            return Math.round((this.seriousInjur / this.totalAccidents) * 100)
        }
    }
}
</script>