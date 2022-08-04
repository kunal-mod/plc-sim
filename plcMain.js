var nodes7 = require("nodes7");
var conn = new nodes7();
var doneReading = false;
var doneWriting = false;

var variables = {
  TEST0: "DB1,INT0",
  TEST1: "DB1,INT2",
  TEST2: "DB1,REAL4",
  TEST3: "DB1,REAL8.4",
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
  conn.addItems(["TEST0", "TEST1", "TEST2", "TEST3"]);
  conn.writeItems(
    ["TEST0", "TEST1", "TEST2", "TEST3"],
    [42, 7, 23.45, [2.3, 45.3, 12.56, 56.7]],
    valuesWritten
  );

  conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad, values) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
  }
  console.log("The valuse are------------------------");
  console.log(values);
  doneReading = true;
  if (doneWriting) {
    process.exit();
  }
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
