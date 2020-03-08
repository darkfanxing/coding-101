<template>
  <v-card class="pa-5">
    <v-card-text class="text-center">
      <img :src="sensor.path" style="width: 50px; height: 50px;">
      <h1 class="text-center my-5">{{ sensor.name }}</h1>
      <div class="pb-0 title">{{ sensorData[0].data.toFixed(3) }} {{ sensor.unit }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from "@/plugins/db.js";

export default {
  data() {
    return {
      sensorData: []
    }
  },
  props: {
    sensor: {
      required: true,
      type: Object
    }
  },
  computed: {
    getSensorsData() {
      return this.sensorData.length == 0 ? "" : this.sensorData
    }
  },
  firebase() {
    return {
      sensorData: db.ref(`/sensor/${this.sensor.queryName}`).limitToLast(1)
    };
  }
}
</script>