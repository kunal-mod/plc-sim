var nodes7 = require("nodes7"); // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7();
var doneReading = false;
var doneWriting = false;

var variables = {
  // TEST1: "MR4", // Memory real at MD4
  // TEST2: "M32.2", // Bit at M32.2
  // TEST3: "M20.0", // Bit at M20.0
  // TEST4: "DB1,REAL0.20", // Array of 20 values in DB1
  // TEST5: "DB1,REAL4", // Single real value
  // TEST6: "DB1,REAL8", // Another single real value
  // TEST7: "DB1,INT12.2", // Two integer value array
  // TEST8: "DB1,LREAL4", // Single 8-byte real value
  // TEST9: "DB1,X14.0", // Single bit in a data block
  // TEST1: "DB1,INT10", // Array of 8 bits in a data block
  // TEST2: "DB1,INT2",
  TEST0: "DB1,INT0",
  TEST1: "DB1,INT2", // Array of 8 bits in a data block
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
