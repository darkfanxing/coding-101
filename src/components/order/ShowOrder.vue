<template>
  <v-card>
    <v-card-title>
      <h2>查詢訂單</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      item-key="id"
      :headers="headers"
      :items="orders"
      :search="search"
      class="elevation-1"
      show-select
      :single-select="false"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <RemoveOrderButton :selected="selected" />
          <SetOrderButton />
          <v-divider vertical class="mx-5"></v-divider>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <EditOrderButton :orderInfo="item"/>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import RemoveOrderButton from "@/components/order/RemoveOrderButton"
import SetOrderButton from "@/components/order/SetOrderButton"
import EditOrderButton from "@/components/order/EditOrderButton"
import { db } from "@/plugins/db.js";

export default {
  data() {
    return {
      headers: [
        { text: "訂單編號", value: "orderName" },
        { text: "客戶名稱", value: "customer" },
        { text: "訂單狀態", value: "status" },
        { text: "負責機器", value: "machine" },
        { text: "完成日期", value: "completeDate" },
        { text: "編輯", value: "action", sortable: false }
      ],
      search: "",
      selected: [],
      orders: []
    };
  },
  components: {
    RemoveOrderButton,
    SetOrderButton,
    EditOrderButton
  },
  firebase() {
    return {
      orders: db.ref("/orders")
    };
  }
};
</script>