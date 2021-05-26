<template>
    <client-only>
        <div class="shadow">     
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
        sectionalData: {
            type: Array,
            required: false,
            default: function () {
                return [44, 55, 13, 33] 
            }
        }
    },
    data() {
        return{
            series: this.sectionalData,
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
                labels: ['Accidents', 'Fatalities', 'Serious Inj', 'Minor Inj'],
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