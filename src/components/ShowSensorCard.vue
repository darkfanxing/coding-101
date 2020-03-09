<template>
  <v-row>
    <v-col cols=12 sm=6 md=4 v-for="(sensor, index) in sensors" :key="`sensor${index}`">
      <SensorCard :sensor="sensor" />
    </v-col>
  </v-row>
</template>

<script>
import SensorCard from "@/components/SensorCard"

export default {
  components: {
    SensorCard
  },
  data() {
    return {
      sensors: [
        {
          name: "PM 2.5",
          queryName: "g3_25",
          path: require("@/assets/icons/industry.svg"),
          unit: "μg/m3"
        },
        {
          name: "PM 10",
          queryName: "g3_10",
          path: require("@/assets/icons/industry.svg"),
          unit: "μg/m3"
        },
        {
          name: "濕度",
          queryName: "humidity",
          path: require("@/assets/icons/tint-solid.svg"),
          unit: "%"
        },
        {
          name: "亮度",
          queryName: "photoresistance",
          path: require("@/assets/icons/lightbulb-solid.svg"),
          unit: "cd/m2"
        },
        {
          name: "溫度",
          queryName: "temperature",
          path: require("@/assets/icons/temperature-high-solid.svg"),
          unit: "℃"
        }
      ]
    }
  }
}
</script>