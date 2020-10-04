<template>
  <div :style="componentPostition">
    <!-- stick the command and search menu -->
    <div :style="stickyMenu">
      <!-- Delete servers -->
      <div class="child inline-block-child">
        <form @submit="deleteServers" style="all: unset">
          <b-button size="sm" type="submit" variant="danger"
            >Delete Record</b-button
          >
          <b-icon icon="trash"></b-icon>
        </form>
      </div>
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      <!-- run the commands on servers -->

      <b-icon icon="collection-play-fill"></b-icon>
      <div class="child inline-block-child">
        <form @submit="commandsRun" style="all: unset">
          <b-input-group>
            <template v-slot:prepend>
              <b-button @click="chooseServer" variant="success" type="submit"
                >Run Command</b-button
              >
            </template>
            <b-form-input
              style="width: 350px"
              type="text"
              class="form-control"
              v-model="command"
              placeholder="Write Command here"
              required
            ></b-form-input>

            <!-- Copy and list commands -->
            <template v-slot:append>
              <select
                id="ddlCommands"
                style="width: 150px"
                type="text"
                text="Copy Commands"
                variant="outline-secondary"
                v-model="command"
              >
                <option id="choosecommand" value>Command List</option>
                <option
                  v-for="command in commands"
                  :key="command.commandname"
                  type="button"
                  v-clipboard:copy="command.commandname"
                >
                  {{ command.commandname }}
                </option>
              </select>
              <b-icon icon="files"></b-icon>
            </template>
          </b-input-group>
        </form>
      </div>

      <!-- Combined output -->
      <div class="child inline-block-child">
        <form @submit="compareServers" style="all: unset">
          <b-button type="submit" variant="success">Combined Output</b-button>
          <b-icon icon="ui-checks"></b-icon>
        </form>
      </div>

      <!-- search for specific server -->
      <div class="child float-right-child">
        <div>
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              class="form-control"
              v-model="search"
              placeholder="Search Server"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
    </div>

    <!-- Select all function -->
    <b-button size="sm" @click="selectAllRows" variant="secondary"
      >Select all</b-button
    >
    <b-button size="sm" @click="clearSelected" variant="secondary"
      >Clear selected</b-button
    >

    <!-- Servers table -->
    <b-table
      selectable
      ref="selectableTable"
      :busy="isBusy"
      :items="filteredPosts"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(output)="data">
        <b-button
          size="sm"
          @click="
            showOutput(
              data.item.output,
              data.item.timestamp,
              data.item.Hostname
            )
          "
          variant="outline-dark"
          >Output</b-button
        >
      </template>
      <!-- Run command spinner -->
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Processing...</strong><br />
          <p>Will take approximately-</p>
          <circular-count-down-timer
            :initial-value="timerCount"
            v-model="counter"
            :steps="400"
            :seconds-fill-color="'#00ffff66'"
          ></circular-count-down-timer>
          <p>Please wait for output</p>
          <p></p>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Posts",
  data() {
    return {
      counter: 0,
      listoutput: "",
      search: "",
      loading: false,
      os: [],
      posts: [],
      fields: [
        {
          key: "id",
          isActive: false,
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "Hostname",
          sortable: true,
          class: "text-center",
        },
        {
          key: "IPAddress",
          sortable: true,
          class: "text-center",
        },
        {
          key: "OS",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Lastcommand",
          sortable: true,
          class: "text-center",
        },
        {
          key: "output",
          sortable: false,
          class: "text-center",
        },
      ],
      id: "",
      command: "",
      commands: [],
      selected: [],
      selectAll: false,
      file: "",
      componentPostition: {
        height: "88vh",
        overflow: "hidden",
      },
      stickyMenu: {
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
      },
      isBusy: false,
      timerCount: 0,
    };
  },
  //To get data from BE
  created() {
    this.getData();
    this.getCommands();
  },
  //For search specific data method
  computed: {
    filteredPosts: function () {
      return this.posts.filter((post) => {
        return (
          post.Hostname.match(this.search) ||
          post.Hostname.match(this.search.toUpperCase()) ||
          post.Hostname.match(this.search.toLowerCase()) ||
          post.IPAddress.match(this.search) ||
          post.OS.match(this.search) ||
          post.OS.match(this.search.toUpperCase()) ||
          post.OS.match(this.search.toLowerCase()) ||
          post.OS.match(this.search[0].toUpperCase()) ||
          post.Lastcommand.match(this.search.toLowerCase()) ||
          post.Lastcommand.match(this.search.toUpperCase())
        );
      });
    },
  },
  methods: {
    //Select multiple servers
    onRowSelected(items) {
      this.selected = items;
    },
    //Select all servers
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    //clear selected servers
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
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
    //Get the Servers Data from BE
    getData() {
      axios
        .get(
          process.env.JSONSERVER_PATH,
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
        .then((posts) => {
          this.posts = posts.data;
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(" Error is: " + error);
        });
    },
    //Run commnd on server or multiple servers
    commandsRun() {
      if (this.selected.length != 0) {
        this.isBusy = !this.isBusy;
        var command = this.command;
        var id = this.selected;
        for (var i = 0; i < id.length; i++) {
          var url = process.env.JSONSERVERRUN_PATH + id[i].id + "/";
          axios
            .put(
              url,
              {
                Lastcommand: command,
                runcommand: "false",
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
            .catch(function (error) {
              console.log(" Error is: " + error);
            });
        }
        this.command = "";
        if (id.length <= 1) {
          this.timerCount = 5;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 5000);
        } else if (id.length >= 2 && id.length < 4) {
          this.timerCount = 10;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 10000);
        } else if (id.length >= 4 && id.length <= 5) {
          this.timerCount = 15;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 15000);
        } else if (id.length >= 6 && id.length <= 8) {
          this.timerCount = 22;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 23000);
        } else if (id.length >= 9 && id.length < 20) {
          this.timerCount = 35;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 35000);
        } else if (id.length >= 20 && id.length <= 30) {
          this.timerCount = 50;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 50000);
        } else if (id.length >= 30 && id.length <= 35) {
          this.timerCount = 65;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 65000);
        } else {
          this.timerCount = 80;
          setTimeout(() => {
            this.isBusy = !this.isBusy;
            this.getData();
            this.clearSelected();
          }, 80000);
        }
      }
    },
    //show Server outputs
    showServers() {
      this.counter = 0;
      const { promisify } = require("util");
      const sleep = promisify(setTimeout);
      var id = this.selected;
      for (var i = 0; i < id.length; i++) {
        var url = process.env.JSONSERVERRUN_PATH + id[i].id + "/";
        axios
          .get(
            url,
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
            this.listoutput +=
              "---------------------------------------------------";
            this.listoutput += "<br>";
            this.counter += 1;
            this.listoutput += "<strong>";
            this.listoutput += this.counter + ")";
            this.listoutput += "Hostname:";
            this.listoutput += response.data.Hostname;
            this.listoutput += "  ";
            this.listoutput += "IP Adress: ";
            this.listoutput += response.data.IPAddress;
            this.listoutput += " Output timestamp";
            this.listoutput += response.data.timestamp;
            this.listoutput += "</strong>";
            this.listoutput += "<br>";
            this.listoutput += "Output:";
            this.listoutput += response.data.output;
            this.listoutput += "<br>";
            this.listoutput +=
              "---------------------------------------------------";
          })
          .catch(function (error) {
            console.log(" Error is: " + error);
          });
      }
      if (this.selected.length <= 8) {
        setTimeout(() => {
          this.listoutput = this.listoutput.replace(/\\n/gi, "<br>");
          this.listoutput = this.listoutput.replace(/\\t/gi, "<br>");
          this.listoutput = this.listoutput.replace(/\\r/gi, "<br>");
          this.listoutput = this.listoutput.replace(/', '/gi, " ");
          this.listoutput = this.listoutput.replace(/']/gi, " ");
          this.listoutput = this.listoutput.replace(/[' ]/gi, " ");
          this.listoutput = this.listoutput.replace(/b'/gi, " ");
          this.listoutput = this.listoutput.replace(/b /gi, " ");
          this.listoutput = this.listoutput.replace("Verint", "Mc4lea");
          this.getData();
          Swal.fire({
            title: "Combined Servers output",
            html: "<pre>" + this.listoutput + "</pre>",
            width: "800px",
            customClass: {
              popup: "format-pre",
            },
          });
          this.isBusy = !this.isBusy;
        }, 2000);
      } else {
        setTimeout(() => {
          this.listoutput = this.listoutput.replace(/\\n/gi, "<br>");
          this.listoutput = this.listoutput.replace(/\\t/gi, "<br>");
          this.listoutput = this.listoutput.replace(/\\r/gi, "<br>");
          this.listoutput = this.listoutput.replace(/', '/gi, " ");
          this.listoutput = this.listoutput.replace(/']/gi, " ");
          this.listoutput = this.listoutput.replace(/[' ]/gi, " ");
          this.listoutput = this.listoutput.replace(/b'/gi, " ");
          this.listoutput = this.listoutput.replace(/b /gi, " ");
          this.listoutput = this.listoutput.replace("Verint", "Mc4lea");
          this.getData();
          Swal.fire({
            title: "Compared Servers output",
            html: "<pre>" + this.listoutput + "</pre>",
            width: "800px",
            customClass: {
              popup: "format-pre",
            },
          });
          this.isBusy = !this.isBusy;
        }, 10000);
      }
      this.listoutput = "";
      this.clearSelected();
    },
    //Compare Server outputs
    compareServers() {
      if (this.selected.length != 0) {
        this.counter = 0;
        const { promisify } = require("util");
        const sleep = promisify(setTimeout);
        var id = this.selected;
        this.isBusy = !this.isBusy;
        for (var i = 0; i < id.length; i++) {
          var url = process.env.JSONSERVERRUN_PATH + id[i].id + "/";
          axios
            .get(
              url,
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
              this.listoutput +=
                "---------------------------------------------------";
              this.listoutput += "<br>";
              this.counter += 1;
              this.listoutput += "<strong>";
              this.listoutput += this.counter + ")";
              this.listoutput += "Hostname:";
              this.listoutput += response.data.Hostname;
              this.listoutput += "  ";
              this.listoutput += "IP Adress: ";
              this.listoutput += response.data.IPAddress;
              this.listoutput += " Output timestamp";
              this.listoutput += response.data.timestamp;
              this.listoutput += "</strong>";
              this.listoutput += "<br>";
              this.listoutput += "Output:";
              this.listoutput += response.data.output;
              this.listoutput += "<br>";
              this.listoutput +=
                "---------------------------------------------------";
            })
            .catch(function (error) {
              console.log(" Error is: " + error);
            });
        }

        if (this.selected.length <= 6) {
          this.timerCount = 2;
          setTimeout(() => {
            this.listoutput = this.listoutput.replace(/\\n/gi, "<br>");
            this.listoutput = this.listoutput.replace(/\\t/gi, "<br>");
            this.listoutput = this.listoutput.replace(/\\r/gi, "<br>");
            this.listoutput = this.listoutput.replace(/', '/gi, " ");
            this.listoutput = this.listoutput.replace(/']/gi, " ");
            this.listoutput = this.listoutput.replace(/[' ]/gi, " ");
            this.listoutput = this.listoutput.replace(/b'/gi, " ");
            this.listoutput = this.listoutput.replace(/b /gi, " ");
            this.listoutput = this.listoutput.replace("Verint", "Mc4lea");
            this.isBusy = !this.isBusy;
            Swal.fire({
              title: "Combined Servers output",
              html: "<pre>" + this.listoutput + "</pre>",
              width: "800px",
              customClass: {
                popup: "format-pre",
              },
            });
          }, 2000);
        } else {
          this.timerCount = 10;
          setTimeout(() => {
            this.listoutput = this.listoutput.replace(/\\n/gi, "<br>");
            this.listoutput = this.listoutput.replace(/\\t/gi, "<br>");
            this.listoutput = this.listoutput.replace(/\\r/gi, "<br>");
            this.listoutput = this.listoutput.replace(/', '/gi, " ");
            this.listoutput = this.listoutput.replace(/']/gi, " ");
            this.listoutput = this.listoutput.replace(/[' ]/gi, " ");
            this.listoutput = this.listoutput.replace(/b'/gi, " ");
            this.listoutput = this.listoutput.replace(/b /gi, " ");
            this.listoutput = this.listoutput.replace("Verint", "Mc4lea");
            this.isBusy = !this.isBusy;
            Swal.fire({
              title: "Compared Servers output",
              html: "<pre>" + this.listoutput + "</pre>",
              width: "800px",
              customClass: {
                popup: "format-pre",
              },
            });
          }, 10000);
        }
        this.clearSelected();
        this.listoutput = "";
        this.counter = 0;
      }
    },
    //Delete record from BE
    deleteServers() {
      var id = this.selected;
      for (var i = 0; i < id.length; i++) {
        var url = process.env.JSONSERVERRUN_PATH + id[i].id + "/";
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
          .catch(function (error) {
            console.log(" Error is: " + error);
          })
          .finally(() => this.getData());
      }

      this.selected = [];
      this.selectAll = false;
      var that = this;
    },
    //User dummy prevention
    chooseServer() {
      if (this.selected.length == 0 && this.command != "") {
        Swal.fire({
          icon: "error",
          title: "Please choose servers",
          width: "800px",
        });
      }
    },
    //Show the command output to user
    showOutput: function (message, timestamp, Hostname) {
      this.getData();
      if (message != "") {
        message = message.replace(/\\n/gi, "<br>");
        message = message.replace(/\\t/gi, "<br>");
        message = message.replace(/\\r/gi, "<br>");
        message = message.replace(/', '/gi, "");
        message = message.replace(/']/gi, " ");
        message = message.replace(/[' ]/gi, " ");
        message = message.replace(/b'/gi, "   ");
        message = message.replace(/b /gi, "   ");
        message = message.replace("Verint", "Mc4lea");
        Swal.fire({
          icon: "info",
          title: "Server Output",
          html: Hostname + " " + timestamp + "<pre>" + message + "</pre>",
          width: "800px",
          customClass: {
            popup: "format-pre",
          },
        });
      }
    },
  },
};
</script>
<style>
.float-right-child {
  float: right;
}
.inline-block-child {
  display: inline-block;
}
.child {
  padding: 1rem;
}
.thead {
  overflow: "auto";
  position: "sticky";
  top: "0";
}
.table thead tr {
  display: block;
}
.table th,
table td {
  width: 1000px;
}
.table tbody {
  display: block;
  height: 480px;
  overflow: auto;
}
.format-pre pre {
  padding: 10px;
  font-size: 14px;
  text-align: left;
}
</style>
