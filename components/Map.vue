<template>
    <v-container>
        <client-only>
          <l-map style="background:white" ref="map"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                :bounds="bounds"
                @update:zoom="zoomUpdated"
                @update:center="centerUpdated"
                @update:bounds="boundsUpdated"
          >
              <l-choropleth-layer
                      v-if="maskAdded"
                      :data="mapData"
                      titleKey="name"
                      idKey="code"
                      :value="value"
                      :extraValues="extraValues"
                      geojsonIdKey="id_1"
                      :geojson="geoData"
                      :colorScale="colorScale"
                      >
                  <template slot-scope="props">
                      <l-info-control 
                        :item="props.currentItem" 
                        :unit="props.unit" 
                        :title="infoTitlePlaceholder"
                        :placeholder="infoPlaceholder" 
                        position="topright"
                      />
                  </template>
              </l-choropleth-layer>
          </l-map>  
        </client-only>
    </v-container>
</template>

<script>
  import Vue from 'vue';
  import InfoControl from '../components/MapInfoControl';
  const ChoroplethLayer = () => import('../components/MapChoroplethLayer');
  import L from 'leaflet';
  import 'leaflet';
  import 'leaflet-boundary-canvas';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
  import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
  import BWA from '../assets/data/botswana.geojson.json';
  import features from '../assets/data/botswana.districts.json';

  var BwaRegions = features;
  var BwaGeoJson = BWA;

  export default Vue.extend({

    
    name: 'Map',

    components: {
      'l-info-control': InfoControl,
      'l-choropleth-layer': ChoroplethLayer
    },

    data: () => ({
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [-22.319394204522993, 23.1591796875],
      zoom: 6.2,
      districtPlaceHolder: "Hover/Click over a District",
      infoPlaceholder: "",
      districtTiltle: "District",
      infoTitlePlaceholder: "",
      botsBounds: [[-15.527718668097657, 29.402278535124022], [-28.275049933352996, 20.21789168575295]],
      sadcBounds: [[16.811959923904034, 53.011762622441765],[ -45.20210213916311, 7.78253638403493]],
      bounds: [],
      BwaRegions,
      mapData: [],
      districtData: [],
      geoData: {},
      zoomAnimation: true,
      colorScale: ["#00ff40",  "#bfff00", '#eeff00', '#ffe100',  '#ff0000'],
      value: {
        key: "confirmed",
        metric: " Confirmed"
      },
      extraValues: [{
        key: "deaths",
        metric: " Deaths"
      },
      {
        key: "recovered",
        metric: " Recovered"
      },
      {
        key: "lastUpdate",
        metric: "LastUpdate"
      }],
      currentStrokeColor: 'fff',
      mapOptions: {
        zoomSnap: 0.1,
        attributionControl: false
      },
      maskAdded: false
    }),
    created: {
        districtData: [
            {"code": 9, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Kweneng", "recovered": 2},
            {"code": 12, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "North-West", "recovered": 2},
            {"code": 14, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "South-East", "recovered": 2},
            {"code": 5, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Ghanzi", "recovered": 2},
            {"code": 15, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Southern", "recovered": 2},
            {"code": 1, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Central", "recovered": 2},
            {"code": 2, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Chobe", "recovered": 2},
            {"code": 8, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Kgatleng", "recovered": 2},
            {"code": 7, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "Kgalagadi", "recovered": 2},
            {"code": 11, "confirmed": 3, "deaths": 0, "lastUpdate": "2020/05/21", "name": "North-East", "recovered": 2}
        ]
    },
    mounted() {
      const map = this.$refs.map.mapObject;
      map.addControl(new window.L.Control.Fullscreen());
      L.control.attribution({prefix: '<div class="leaflet-control-attribution leaflet-control"><a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></div>'}).addTo(map);

      this.mapDisplayBounds(BwaGeoJson);
      this.mapData = this.districtData;
      this.geoData = BwaRegions;
      this.bounds = this.botsBounds;

      this.infoPlaceholder =  this.districtPlaceHolder;
      this.infoTitlePlaceholder = this.districtTiltle;
    },
    methods: {
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
      mapDisplayBounds(geoJson) {
        this.$nextTick()
        .then(() => {
          const map = this.$refs.map.mapObject;
          window.L.TileLayer.boundaryCanvas(
            this.url, {
              boundary: geoJson, 
            }).addTo(map);
          return this.$nextTick();
        })
        .then(() => {
          this.maskAdded = true;
        })
      },
      removeMapLayer(){
        const map = this.$refs.map.mapObject;
        var layers = [];
        map.eachLayer(function(layer) {
            if( layer instanceof L.TileLayer )
                layers.push(layer);
        });
        
        map.removeLayer(layers[0])
      }
    }
  })
</script>
<style lang="scss" scoped>
  html:not(#_) {
      overflow-y: hidden;
      .container {
        z-index: 0;
          margin-bottom:20px;  
          margin-top:30px;
          height: 80vh;
          width: 95vw;
          max-width: none;
          padding: 0;
      }
  } 
</style>
