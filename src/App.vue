<template>
  <v-app>
    <v-container fluid class="pa-0">
      <div v-show="page.search" class="mx-auto" style="max-width: 800px;">
        <ShowMachine class="mt-5" />
        <ShowOrder class="mt-8" />
        <ShowSensorCard class="mt-5" />  
      </div>

      <ShowAgv v-if="page.agv.display" :agv="page.agv.name"/>
      <FlatActionButton />
    </v-container>
  </v-app>
</template>

<script>
import ShowOrder from "@/components/order/ShowOrder"
import ShowMachine from "@/components/ShowMachine"
import ShowSensorCard from "@/components/ShowSensorCard"
import FlatActionButton from "@/components/FlatActionButton"
import ShowAgv from "@/components/ShowAgv"

import EventBus from "@/plugins/event-bus"

export default {
  data() {
    return {
      page: {
        agv: {
          display: false,
          name: ""
        },
        search: true
      }
    }
  },
  components: {
    ShowOrder,
    ShowMachine,
    ShowSensorCard,
    FlatActionButton,
    ShowAgv
  },
  mounted() {
    EventBus.$on("changePage", (page) => {
      if (page.search("agv") != -1) {
        this.page.search = false;
        this.page.agv = {
          display: true,
          name: page
        }
      } else {
        this.page.search = true;
        this.page.agv.display = false;
      }
    })
  }
};
</script>

<style>
* {
  font-family: '微軟正黑體'!important;
}
</style>