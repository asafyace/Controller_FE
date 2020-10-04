
<template>
  <div class="container">
    <h3 style="text-align: center">Subsystems</h3>
    <div class="row">
      <div class="column">
        <b-button href="https://kmp1/nuxeo/login.jsp" target="_blank"
          >KMP</b-button
        >
        &ensp;
        <b-button href="master02:4444/dashboard/links.html" target="_blank"
          >MassDashboard</b-button
        >
        &ensp;
        <b-button href="master02:8080/#/main/services" target="_blank"
          >Ambari</b-button
        >
        &ensp;
        <b-button href="kafka01:9000/topman" target="_blank">Topman</b-button>
        &ensp;
        <b-button href="master03:9007/dps/querys.html" target="_blank"
          >DPS</b-button
        >
        &ensp;
        <b-button href="master01:8085/admin/" target="_blank">Airflow</b-button>
        &ensp;
        <b-button href="https://ugsvbw51:8443/app/" target="_blank"
          >UGSVBW51</b-button
        >&ensp;
        <b-button href="https://dbs1:8443/app/" target="_blank">DBS1</b-button
        >&ensp;
        <b-button href="https://rms1:8443/app/" target="_blank">RMS1</b-button
        >&ensp;
      </div>
    </div>
    <div class="row">
      <div class="column">
        <b-button href="https://ugs1:8443/app/" target="_blank">UGS1</b-button
        >&ensp;
        <b-button href="https://bls-ms1:8761" target="_blank">Eureka</b-button
        >&ensp;
        <b-button
          href="tsdb1:5601/app/kibana#/dev_tools/console?_g=()"
          target="_blank"
          >Kibana</b-button
        >
        &ensp;
        <b-button href="ucp1:8080/ucp/SmokeTests.html" target="_blank"
          >UCP</b-button
        >
        &ensp;
        <b-button href="http://VLAP1" target="_blank">VLAP</b-button>&ensp;
        <b-button
          href="https://ugsvbw51:8443/ux-glue/public/#!/login"
          target="_blank"
          >MCCX DC</b-button
        >&ensp;
        <b-button
          href="https://ugs1:8443/ux-glue/public/#!/login?be=TC"
          target="_blank"
          >MCCX TC</b-button
        >&ensp;
      </div>
    </div>
    <br />
    <br />
    <h3 style="text-align: center">Infra Tools</h3>
    <div class="row">
      <div class="column"></div>
      &ensp;
      <b-button href="https://midgard1/SMaC/login" target="_blank"
        >SMAC</b-button
      >&ensp;
      <b-button href="midgard:8080/login?from=%2F" target="_blank"
        >Jenkins</b-button
      >&ensp;
      <b-button
        href="https://10.164.18.107:3000/d/homepage123/homepage?orgId=1"
        target="_blank"
        >M&D</b-button
      >&ensp;
      <b-button href="https://10.164.18.107:9090/targets" target="_blank"
        >M&D Targets</b-button
      >&ensp;
      <b-button href="https://automation1:8888" target="_blank"
        >Automantion Report</b-button
      >&ensp;
      <b-button href="https://automation1:8080/login?from=%2F" target="_blank"
        >Automantion Jenkins</b-button
      >&ensp;
      <b-button href="https://midgard1:9535/ui/vault/auth" target="_blank"
        >Vault</b-button
      >&ensp;
      <!--  -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Fetch } from "vue-fetch";
export default {
  name: "Management",
  data() {
    return {
      dps: "",
      ambari: "",
      ugs: "",
      blsms: "",
    };
  },

  methods: {
    checkdpsServer() {
      axios
        .get("http://10.164.67.50:9007")
        .then((response) => {
          this.dps = "Success";
          console.log(" Success");
        })
        .catch(function (error) {
          this.dps = "Error";
          console.log(" Error is: " + error);
        });
    },
    checkambariServer() {
      axios.get("http://10.164.7.177:4444/").then((response) => {
        this.ambari = "Success";
        console.log(" Success");
      });
    },
    checkugssServer() {
      // const res = fetch("http://10.164.60.48:8080/metrics");
      // console.log(res);

      axios("http://10.164.60.48:8080/metrics", {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          this.blsms = "Success";
          console.log(" Success");
        })
        .catch(function (error) {
          this.blsms = "Error";
          console.log(" Error is: " + error);
        });
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
  width: 10%;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
}
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
}
input[type="submit"]:hover {
  background-color: #45a049;
}
/* Style the container/contact section */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 5px;

  height: 88vh;
}
/* Create two columns that float next to eachother */
.column {
  float: left;
  width: 100%;
  margin-top: 6px;
  padding: 10px;
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