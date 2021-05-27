<template>
    <client-only>
        <div class="shadow rounded-lg">     
            <div class="chart-wrap">
                <div id="chart">
                    <apexcharts type="donut" width="380" :options="chartOptions" :series="series"></apexcharts>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script>
export default {
    props: {
        minorInjur: {
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
        }
    },
    data() {
        return{
            series: [this.fatalities, this.seriousInjur, this.minorInjur],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                labels: ['Fatalities', 'Serious Inj', 'Minor Inj'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                        width: 200
                        },
                        legend: {
                        show: false
                        }
                    }
                }],
                legend: {
                    position: 'right',
                    offsetY: 0,
                    height: 230,
                }
            }
        }
    }
}
</script>