var nodes7 = require("nodes7");
var conn = new nodes7();
var doneReading = false;
var doneWriting = false;

var variables = {
  TEST0: "DB1,INT0",
  TEST1: "DB1,INT2",
  TEST2: "DB1,INT4",
  TEST3: "DB1,INT6",
  TEST4: "DB1,INT8",
  TEST5: "DB1,INT10",
  TEST6: "DB1,INT12",
  TEST7: "DB1,INT14",
  TEST8: "DB1,INT16",
  TEST9: "DB1,INT18",
  TEST10: "DB1,INT20",
};

conn.initiateConnection(
  { port: 102, host: "127.0.0.1", rack: 0, slot: 1, debug: true },
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
  conn.addItems([
    "TEST0",
    "TEST1",
    "TEST2",
    "TEST3",
    "TEST4",
    "TEST5",
    "TEST6",
    "TEST7",
    "TEST8",
    "TEST9",
    "TEST10",
  ]);
  conn.writeItems(
    [
      "TEST0",
      "TEST1",
      "TEST2",
      "TEST3",
      "TEST4",
      "TEST5",
      "TEST6",
      "TEST7",
      "TEST8",
      "TEST9",
      "TEST10",
    ],
    ["23", "348", "33", "24", "54", "64", "23", "12", "42", "54", "67"],
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
