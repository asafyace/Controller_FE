<template>
  <p v-if="lab[0] !== ''">{{ lab }}</p>
  <p v-else>nada</p>
</template>
<script>
import axios from "axios";
export default {
  name: "Lab",
  data() {
    return {
      lab: [],
    };
  },
  created() {
    var labname = "";
    axios
      .get(
        process.env.JSONLAB_PATH,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        {
          auth: {
            username: process.env.USERNAMEC,
            password: process.env.PASSWORDC,
          },
        }
      )
      .then((lab) => {
        this.lab = lab.data[0].labname;
      })
      .catch(function (error) {
        console.log("Post Error : " + error);
      });
  },
};
</script>
