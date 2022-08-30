const fs = require("fs");

let json = JSON.parse(
  fs.readFileSync("./coverage/coverage-summary.json").toString("utf-8")
);

const pct = json["total"]["functions"]["pct"];

let color = "";

if (pct > 80) {
  color = "brightgreen";
} else if (pct > 60) {
  color = "green";
} else if (pct > 50) {
  color = "yellow";
} else if (pct > 30) {
  color = "orange";
} else {
  color = "red";
}

let str = fs.readFileSync("./README.md").toString("utf-8");
str = str.replace(
  /<!-- Begin Code Coverage[^]*End Code Coverage -->/gm,
  `<!-- Begin Code Coverage -->\n\
\n\
![Code Coverage](https://img.shields.io/badge/coverage-${pct}%-${color})\n\
\n\
<!-- End Code Coverage -->`
);

fs.writeFileSync("./README.md", str);
