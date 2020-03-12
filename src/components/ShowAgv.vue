<template>
  <div id="channel-container">
    <div class="channel">
      <vue-scroll ref="vs" @handle-resize="handleResize">
        <div class="white--text mb-4" v-for="(message, index) in messages" :key="index">
          <div v-if="message.content">
            <div class="d-flex align-center">
              <span class="title mx-2 mt-2">
                {{ message.name }}
                <div>
                  <span class="grey--text caption" style="position: relative; bottom: 10px;">{{ message.time }}</span>
                </div>
              </span>
              <span class="content">{{ message.content }}</span>
            </div>
            
          </div>
          <div v-if="message.text">
            <div class="d-flex justify-end align-center">
              <span class="content">{{ message.text }}</span>
              <span class="title mr-3 mt-2 text-end">
                {{ message.name }}
                <div>
                  <span class="grey--text caption" style="position: relative; bottom: 10px;">{{ message.time }}</span>
                </div>
              </span>
            </div>
          </div>
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
      ],
      lastMessage: []
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
    },
    lastMessage() {
      if(this.lastMessage[0] != undefined) {
        this.messages.push(this.lastMessage[0])
      }
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
      }
    },
    handleResize() {
      this.$refs.vs.scrollBy({dy: 900000}, 500, "easeInQuad")
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
        const messages = snapshot.val()
        this.parserMessages(messages)

        this.$refs["vs"].scrollTo({y: 90000});
      })
    },
    parserMessages(messages) {
      for (let i in messages){
        let message = {
          text: messages[i].text,
          content: messages[i].content,
          name: messages[i].name,
          time: messages[i].time
        }

        this.messages.push(message)
      }
    }
  },
  firebase() {
    return {
      lastMessage: db.ref(`/chatbot/${this.agv}`).limitToLast(1)
    };
  }
}
</script>

<style scoped>
#channel-container {
  width: 100vw;
  height: 100vh;
  margin:0;
  padding:0;
  background:url(https://i.imgur.com/IkK0jNa.jpg);
  background-size:cover;
  overflow: "hidden";
}

.channel {
  max-width:600px;
  height: calc(100% - 150px);
  margin:0 auto;
  box-sizing:border-box;
  background:rgba(0, 0, 0, .4);
}

.content {
  margin: 0 10px;
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