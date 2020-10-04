
<template>
  <div class="container">
    <!-- Import servers -->
    <h4 style="text-align: center">Import Servers</h4>
    <b-icon icon="upload"></b-icon>
    <div class="custom-file" style="width: 30%">
      <input
        type="file"
        class="custom-file-input"
        id="validatedCustomFile"
        v-on:change="handleFileUpload()"
        ref="file"
      />
      <label class="custom-file-label" for="validatedCustomFile">{{
        this.file.name
      }}</label>
      <div class="invalid-feedback">Example invalid custom file feedback</div>
    </div>
    <b-button variant="success" v-on:click="submitFile()"
      >Import servers</b-button
    >

    <!-- Add server -->
    <h4 style="text-align: center">Add Server</h4>
    <div class="row">
      <div class="column">
        <form style="all: unset">
          <label for="Hostname">Hostname</label>
          <input
            type="text"
            v-model="Hostname"
            name="Hostname"
            placeholder="Hostname"
            required
          />
          <label for="IPAddress">IPAddress</label>
          <input
            type="text"
            v-model="IPAddress"
            name="IP Address"
            placeholder="IP Address"
            required
          />
          <label for="OSServer">OS</label>
          <select v-model="OSServer" name="OS" id="OSServer" required>
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option>
          </select>
          <input type="submit" v-on:click="postServer()" value="Add" />
        </form>
      </div>
    </div>

    <!-- Change default users -->
    <h4 style="text-align: center">Change default users</h4>
    <!-- Change Linux user -->
    <div class="row">
      <div class="column">
        <form style="all: unset">
          <label for="Username">Username</label>
          <input
            required
            type="text"
            v-model="UsernameL"
            name="Username"
            placeholder="root"
          />
          <label for="Password">Password</label>
          <input
            required
            type="text"
            v-model="PasswordL"
            name="Password"
            placeholder="cus.."
          />
          <label for="OSLinux">OS</label>
          <select v-model="OSLinux" name="OSLinux" id="OSLinux">
            <option value="Linux">Linux</option>
          </select>
          <input type="submit" v-on:click="postUserl()" value="Change" />
        </form>
      </div>
    </div>
    <!-- Change Windows user -->
    <div class="row">
      <div class="column">
        <form style="all: unset">
          <label for="Username">Username</label>
          <input
            type="text"
            v-model="UsernameW"
            name="Username"
            placeholder="hercules"
            required
          />
          <label for="Password">Password</label>
          <input
            type="text"
            v-model="PasswordW"
            name="Password"
            placeholder="Rel.."
            required
          />
          <label for="OSWindows">OS</label>
          <select v-model="OSWindows" name="os" id="OSWindows">
            <option value="Windows">Windows</option>
          </select>
          <input type="submit" v-on:click="postUserW()" value="Change" />
        </form>
      </div>
    </div>

    <!-- Add Command -->
    <h4 style="text-align: center">Add/Revome Command</h4>
    <div class="row">
      <div class="column">
        <form style="all: unset">
          <label style="padding-top: 10px" for="Command">Command</label>&ensp;
          <input
            type="text"
            v-model="command"
            name="command"
            placeholder="Write here"
            required
          />
          <select v-model="OSCommand" name="OS" id="OSCommand" required>
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option></select
          >&ensp;
          <input type="submit" v-on:click="addCommand()" value="Add" />
        </form>
        <!-- Remove Command -->
        <form style="all: unset">
          &nbsp;
          <label style="padding-top: 10px" for="Command">Command</label>
          &nbsp;
          <select type="text" text=" Commands" v-model="commandR" required>
            <option v-for="command in commands" :key="command.commandname">
              {{ command.commandname }}
            </option>
          </select>
          <b-button type="submit" @click="removeCommand()" variant="danger"
            >Remove</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Configuration",
  data() {
    return {
      commandR: "",
      commands: [],
      file: "",
      Hostname: "",
      IPAddress: "",
      OSServer: "",
      OSCommand: "",
      OSLinux: "",
      OSWindows: "",
      UsernameL: "",
      PasswordL: "",
      UsernameW: "",
      PasswordW: "",
      command: "",
    };
  },

  //To get data from BE
  created() {
    this.getCommands();
  },
  methods: {
    //Get the Command Data from BE
    getCommands() {
      axios
        .get(
          process.env.JSONCOMMAND_PATH,
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
        .then((response) => {
          this.commands = response.data;
        })
        .catch(function (error) {
          console.log(" Error is: " + error);
        });
    },
    //Add server to BE
    postServer() {
      if (this.Hostname != "" && this.IPAddress != "" && this.OSServer != "") {
        axios
          .post(
            process.env.JSONSERVER_PATH,
            {
              Hostname: this.Hostname,
              IPAddress: this.IPAddress,
              OS: this.OSServer,
            },
            {
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
            Swal.fire({
              icon: "info",
              title: "Your server has been added",
              html: "Thanks!",
              width: "800px",
            });
          })
          .catch(function (error) {
            console.log(" Error is: " + error);
            Swal.fire({
              icon: "error",
              title: "Please fix data",
              width: "800px",
            });
          });
        this.Hostname = "";
        this.IPAddress = "";
        this.OSServer = "";
      }
    },
    //Change default Linux user
    postUserl() {
      if (this.UsernameL != "" && this.PasswordL != "") {
        axios
          .put(
            process.env.JSONUSERL_PATH,
            {
              user_name: this.UsernameL,
              password: this.PasswordL,
              os: "Linux",
            },
            {
              withCredentials: true,
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
        this.UsernameL = "";
        this.PasswordL = "";
        this.OSLinux = "";
        Swal.fire({
          icon: "info",
          title: "Your default linux user for lab has been changed",
          html: "Thanks!",
          width: "800px",
        });
      }
    },
    //Change default Windows user
    postUserW() {
      if (this.UsernameW != "" && this.PasswordW != "") {
        axios
          .put(
            process.env.JSONUSERW_PATH,
            {
              user_name: this.UsernameW,
              password: this.PasswordW,
              os: "Windows",
            },
            {
              withCredentials: true,
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
        this.UsernameW = "";
        this.PasswordW = "";
        this.OSWindows = "";
        Swal.fire({
          icon: "info",
          title: "Your default Windows user for lab has been changed",
          html: "Thanks!",
          width: "800px",
        });
      }
    },
    //Add Command to BE
    addCommand() {
      if (this.command != "" && this.OSCommand != "") {
        axios
          .post(
            process.env.JSONCOMMAND_PATH,
            {
              commandname: this.command,
              os: this.OSCommand,
            },
            {
              withCredentials: true,
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
        this.command = "";
        this.OSCommand = "";
        Swal.fire({
          icon: "info",
          title: "Your command has been added to list",
          html: "Thanks!",
          width: "800px",
        });
      }
    },
    //Remove Command to BE
    removeCommand() {
      this.getCommands();
      if (this.commandR != "") {
        console.log(this.commandR);
        for (var i = 0; i < this.commands.length; i++) {
          if (this.commandR == this.commands[i].commandname) {
            var url = process.env.JSONCOMMAND_PATH + this.commands[i].id + "/";
          }
        }
        console.log(url);
        axios
          .delete(
            url,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "form-data",
              },
            },
            {
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
        Swal.fire({
          icon: "info",
          title: "Your command has been removed to list",
          html: "Thanks!",
          width: "800px",
        });
        this.commandR = "";
      }
    },
    //Import record and send to BE
    submitFile() {
      if (this.file != "") {
        let formData = new FormData();
        formData.append("file", this.file);
        axios
          .post(
            process.env.JSONHOME_PATH,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            {
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
            Swal.fire({
              icon: "error",
              title: "Upload Format Pay attention!",
              html:
                "Only xlsx format is allowd<br>Please export from lab portal<br> please make sure that xlsx is formatted as presented<br>|id|&nbsp;|Hostname(Cleaned as MPS1)|&nbsp; |IPAddress|&nbsp;|OS|",
              width: "800px",
            });
          })
          .finally(() => this.getData());
        Swal.fire({
          icon: "info",
          title: "Import complete ",
          html:
            "Only xlsx format is allowd<br>Please export from lab portal<br> please make sure that xlsx is formatted as presented<br>|id|&nbsp;|Hostname(Cleaned as MPS1)|&nbsp; |IPAddress|&nbsp;|OS|",
          width: "800px",
        });
        this.file = "";
      }
    },
    //Handles a change on the file upload
    handleFileUpload() {
      Swal.fire({
        icon: "info",
        title: "Upload Format",
        html:
          "Only xlsx format is allowd<br>Please export from lab portal<br> please make sure that xlsx is formatted as presented<br>|id|&nbsp;|Hostname(Cleaned as MPS1)|&nbsp; |IPAddress|&nbsp;|OS|",
        width: "800px",
      });
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}
/* Style inputs */
input[type="text"],
textarea {
  width: 20%;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
}
select {
  width: 15%;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
}
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 8px 15px;
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
  height: 100vh;
}
/* Create two columns that float next to eachother */
.column {
  float: center;
  width: 100%;
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