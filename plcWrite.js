var nodes7 = require("nodes7");
var conn = new nodes7();
var doneReading = false;
var doneWriting = true;

var variables = {
  TEST0: "DB1,INT0",
  TEST1: "DB1,INT2",
};

conn.initiateConnection(
  { port: 102, host: "192.168.0.21", rack: 0, slot: 1, debug: true },
  connected
);

function connected(err) {
  if (typeof err !== "undefined") {
    console.log(err);
    process.exit();
  }
  conn.setTranslationCB(function (tag) {
    return variables[tag];
  });
  conn.addItems(["TEST0", "TEST1"]);
  conn.writeItems(["TEST0", "TEST1"], [42, 7], valuesWritten);
}

function valuesWritten(anythingBad, values) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG WRITING VALUES!!!!");
  }
  console.log("Done writing.");
  doneWriting = true;
  if (doneReading) {
    process.exit();
  }
}
