<template>
    <client-only>
        <div class="shadow">
           
            <div class="chart-wrap">
                <div id="chart">
                    <apexcharts type="donut" width="380" :options="chartOptions" :series="series"></apexcharts>
                </div>
            </div>
        
            <div class="actions">
                <button  
                    @click="appendData">
                    + ADD
                </button>
                
                <button
                    @click="removeData">
                    - REMOVE
                </button>
                
                <button 
                    @click="randomize">
                    RANDOMIZE
                </button>
                
                <button 
                    @click="reset">
                    RESET
                </button>
            </div>

        </div>
    </client-only>
</template>
<script>
export default {
    data() {
        return{
            series: [44, 55, 13, 33],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                dataLabels: {
                    enabled: false
                },
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
    },
    methods: {
        appendData: function () {
            var arr = this.series.slice()
            arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
            this.series = arr
        },
    
        removeData: function () {
            if(this.series.length === 1) return
            var arr = this.series.slice()
            arr.pop()
            this.series = arr
        },
    
        randomize: function () {
            this.series = this.series.map(function() {
                return Math.floor(Math.random() * (100 - 1 + 1)) + 1
            })
        },
    
        reset: function () {
            this.series = [44, 55, 13, 33]
        }
    }      
}
</script>