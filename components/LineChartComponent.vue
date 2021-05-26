<template>
    <client-only>
        <div class="shadow rounded-lg bg-white pt-6 w-full ">
            <div id="chart">
                <apexcharts type="line" height="350" :options="chartOptions" :series="series"></apexcharts>
            </div>
        </div>
    </client-only>
</template>
<script>
export default {
    props: {
        totalAccidents: {
            type: Array,
            required: false,
            default: function (){
                return [10, 41, 35, 51, 49, 62, 69, 91, 148] 
            }
        },
        fatalities: {
            type: Array,
            required: false,
             default: function (){
                return [5, 0, 15, 20, 25, 30, 35, 45, 90] 
            } 
        },
    },
    data() {
        return{
            series: [{
                name: "Total Accidents",
                data: this.totalAccidents
            },
            {
                name: "Fatalities",
                data: this.fatalities
            }],
            chartOptions: {
                chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Road Traffic Accidents over the years',
                    align: 'center'
                },
                grid: {
                    row: {
                    colors: ['#f3f3f3', 'transparent'], 
                    opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                }
            },      

        }
    }      
}
</script>