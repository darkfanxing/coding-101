<template>
  <div id="channel-container">
    <div class="channel">
      <vue-scroll ref="vs" @handle-resize="handleResize">
        <div class="white--text mb-4" v-for="(message, index) in messages" :key="index">
          <div>
            <span class="title">{{ message.name }} 說</span>
            <span class="content" v-if="message.content">{{ message.content }}</span>
            <span class="content" v-if="message.text">{{ message.text }}</span>
          </div>
          <span class="grey--text caption" style="position: relative; bottom: 10px;">{{ message.time }}</span>
        </div>
        <div id="bottom"></div>
      </vue-scroll>
      <v-form class="instruction-form" ref="form" v-model="valid" lazy-validation>
        <v-row no-gutters>
          <v-col cols="8">
            <v-text-field
              required
              v-model="name"
              label="Name"
              class="ml-auto"
              :rules="[v => !!v || 'Name is required']"
              style="width: 90%;"
            ></v-text-field>
            <v-select
              v-model="instruction"
              :items="instructionSelects"
              label="Instruction"
              required
              class="ml-auto"
              :rules="[v => !!v || 'Item is required']"
              style="width: 90%"
            ></v-select>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn @click="sendData" color="primary">送出訊息</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/db.js";

export default {
  data() {
    return {
      name: "",
      messages: [],
      valid: true,
      instruction: "",
      instructionSelects: [
        "啟動",
        "暫停",
        "卸載",
        "到站 A",
        "到站 B",
        "到站 C",
        "到站 D",
        "到站 E",
        "到站 F"
      ]
    }
  },
  props: {
    agv: {
      type: String,
      required: true
    }
  },
  created() {
    this.getMessages()
  },
  watch: {
    agv() {
      this.messages = []
      this.getMessages()
    }
  },
  methods: {
    sendData() {
      if (this.$refs.form.validate()) {
        let message = {
          name: this.name,
          text: this.instruction,
          time: this.getTime()
        }

        db.ref(`/chatbot/${this.agv}`).push(message);

        this.$refs.form.reset()
        this.messages.push(message)
      }
    },
    handleResize() {
      this.$refs.vs.scrollBy({dy: 600}, 500, "easeInQuad")
    },
    getTime() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      
      if(h < 10) h = "0" + h ;
      if(m < 10) m = "0" + m ;
      if(s < 10) s = "0" + s ;
      
      return h + ":" + m + ":" + s;
    },
    getMessages() {
      db.ref(`/chatbot/${this.agv}`).once('value', snapshot => {
        const documents = snapshot.val()
        for (let i in documents){
          let message = {
            text: documents[i].text,
            content: documents[i].content,
            name: documents[i].name,
            time: documents[i].time
          }

          this.messages.push(message)
        }
        
        this.$refs["vs"].scrollTo({y: 90000});
      })
    }
  }
}
</script>

<style>
#channel-container {
  width: 100vw;
  height: 100vh;
  margin:0;
  padding:0;
  background:url(https://i.imgur.com/IkK0jNa.jpg);
  background-size:cover;
}

.channel {
  max-width:600px;
  height: calc(100% - 150px);
  margin:0 auto;
  box-sizing:border-box;
  background:rgba(0, 0, 0, .4);
}

#input {
  position:absolute;
  z-index:2;
  height:90px;
  width:100%;
  left:0;
  bottom:0;
  margin:0;
  padding: 5px 30px;
  box-sizing:border-box;
  background:#222;
  color:#fff;
}

.content {
  margin: 20px;
  padding: 8px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  color: black;
}

.instruction-form {
  background-color: white;
  height: 150px;
}
</style>