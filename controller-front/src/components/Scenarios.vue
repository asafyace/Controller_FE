
<template>
  <div class="container">
    <!-- Add Command -->
    <h3 style="text-align: center">Subsystem Command</h3>
    <div class="row">
      <div class="column">
        <!-- Masters -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>Masters/Workers</option>
          <option v-for="command in commands" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- Kmp -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>Kmp</option>
          <option v-for="command in commandsKmp" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- Vlap -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>Vlap</option>
          <option v-for="command in commandsVlap" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
      </div>
    </div>
    <div class="row">
      <div class="column">
        <!-- Mops -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>Mops</option>
          <option v-for="command in commandsMops" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- TSDB -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>TSDB</option>
          <option v-for="command in commandsTSDB" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- MDW -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>MDW</option>
          <option v-for="command in commandsMDW" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
      </div>
    </div>
    <div class="row">
      <div class="column">
        <!-- UGS/RMS/DBS/UGSVBW -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>UGS/RMS/DBS/UGSVBW</option>
          <option v-for="command in commandsUGS" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- BLS-MS -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>BLS-MS</option>
          <option v-for="command in commandBLS" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- MLS -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>MLS</option>
          <option v-for="command in commandMLS" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
      </div>
    </div>
    <div class="row">
      <div class="column">
        <!-- VTPS -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>VTPS</option>
          <option v-for="command in commandsVTPS" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
        <!-- ASE -->
        <select type="text" text=" Commands" v-model="command" required>
          <option value>ASE</option>
          <option v-for="command in commandASE" :key="command.commandname">
            {{ command.commandname }}
          </option>
        </select>
        <input type="submit" v-on:click="addCommand()" value="Add" />
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Scenarios",
  data() {
    return {
      commandR: "",
      command: "",
      commands: [
        {
          commandname:
            "runuser -l hdfs -c 'hdfs dfs -rm -R -skipTrash hdfs:///spark2-history/*'",
        },
        {
          commandname: "ambari-agent restart",
        },
        {
          commandname: "mcspace-dps-restart.sh",
        },
        {
          commandname: "mcspace-topman-restart.sh",
        },
      ],
      commandsKmp: [
        {
          commandname: "docker service scale nuxeo=0",
        },
        {
          commandname: "docker service scale nuxeo=1",
        },
        {
          commandname: "cat /opt/mcspace/kmp/nuxeo/logs/console.log",
        },
      ],
      commandsVlap: [
        {
          commandname: "Restart-Service -f -DisplayName mc4lea.vlap.watchdog",
        },
        {
          commandname: "Get-Content D:/Mc4LEA/VLAP/cfg/app.conf",
        },
      ],
      commandsMops: [
        {
          commandname: "Get-Content D:/mc4lea/GlobalConfiguration/Config.XML",
        },
        {
          commandname: "get-service -DisplayName *mops*",
        },
        {
          commandname: "start-service -DisplayName *mops*",
        },
      ],
      commandsTSDB: [
        {
          commandname: "systemctl status kibana ",
        },
        {
          commandname: "systemctl status  elasticsearch",
        },
        {
          commandname: "service elasticsearch start;service kibana start",
        },
      ],
      commandsMDW: [
        {
          commandname: "runuser -l gpadmin -c 'gptext-state'",
        },
        {
          commandname: "runuser -l gpadmin -c 'gptext-start'",
        },
        {
          commandname: "runuser -l gpadmin -c 'gpstate'",
        },
        {
          commandname: "runuser -l gpadmin -c 'gpstart'",
        },
      ],
      commandsUGS: [
        {
          commandname:
            "Restart-Service -ServiceName Wildfly -force | taskkill /IM java.exe /F",
        },
        {
          commandname:
            "Stop-Service -ServiceName Wildfly -force | taskkill /IM java.exe /F",
        },
        {
          commandname:
            "Remove-Item 'D:/Mc4LEA/DBS/JBOSS/standalone/log' -Recurse;Remove-Item 'D:/Mc4LEA/DBS/JBOSS/standalone/tmp' -Recurse",
        },
      ],
      commandBLS: [
        {
          commandname: "docker ps -a | grep audittrail",
        },
        {
          commandname: "docker version",
        },
      ],
      commandMLS: [
        {
          commandname: "Get-Service -DisplayName *mls*",
        },
        {
          commandname: "restart-Service -DisplayName *mls*",
        },
        {
          commandname: "Get-Content D:/Mc4LEA/MLS/MLS.xml | select -First 5",
        },
      ],
      commandsVTPS: [
        {
          commandname: "systemctl status vtps",
        },
      ],
      commandASE: [
        {
          commandname: "systemctl status ase",
        },
        {
          commandname: "service ase stop",
        },
        {
          commandname: "service ase start",
        },
      ],
    };
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
    //Add command to BE
    addCommand() {
      if (this.command != "") {
        axios
          .post(
            process.env.JSONCOMMAND_PATH,
            {
              commandname: this.command,
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
        Swal.fire({
          icon: "info",
          title: "Your command has been added to list",
          html: "Thanks!",
          width: "800px",
        });
      }
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
  width: 25%;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
}
select {
  width: 20%;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
}
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 8px 20px;
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