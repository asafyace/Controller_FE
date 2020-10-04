
<template>
  <div class="container">
    <div style="text-align: center">
      <h3>Contact Us about any issue</h3>
    </div>
    <div class="row">
      <div class="column">
        <img src="../../static/help.jpg" alt="help" style="width: 50%" />
      </div>
      <div class="column">
        <label for="fname">First Name</label>
        <input
          type="text"
          v-model="fname"
          name="firstname"
          placeholder="Your name.."
        />
        <label for="lname">Last Name</label>
        <input
          type="text"
          v-model="lname"
          name="lastname"
          placeholder="Your last name.."
        />
        <label for="subject">Subject</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write something.."
          style="height: 170px"
          v-model="subject"
        ></textarea>
        <input type="submit" v-on:click="postComplain()" value="Send" />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Contact",
  data() {
    return {
      fname: "",
      lname: "",
      subject: "",
    };
  },
  methods: {
    postComplain() {
      axios
        .post(
          process.env.JSONCOMPLAIN_PATH,
          {
            firstname: this.fname,
            lastname: this.lname,
            subject: this.subject,
          },
          {
            withCredentials: false,
            headers: {
              "Content-Type": "application/json",
            },
            auth: {
              username: process.env.USERNAMEC,
              password: process.env.PASSWORDC,
            },
          }
        )
        .then((response) => {
          console.log(" Success");
        })
        .catch(function (error) {
          console.log(" Error is: " + error);
        });
      this.fname = "";
      this.lname = "";
      this.subject = "";
      Swal.fire({
        icon: "info",
        title: "Your complain has been registered",
        html: "Thanks!",
        width: "800px",
      });
    },
  },
};
</script>
<style scoped>
/* Style inputs */
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px 10px;
}
input[type="submit"]:hover {
  background-color: #45a049;
}
/* Style the container/contact section */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 10px;
  height: 88vh;
}
/* Create two columns that float next to eachother */
.column {
  float: left;
  width: 50%;
  margin-top: 6px;
  padding: 20px;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column,
  input[type="submit"] {
    width: 50%;
    margin-top: 0;
  }
}
</style>