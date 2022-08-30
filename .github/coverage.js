const fs = require("fs");

let str = fs.readFileSync("./README.md").toString("utf-8");
str = str.replace(
  /<!-- Begin Code Coverage[^]*End Code Coverage -->/gm,
  "<!-- Begin Code Coverage -->\n\
\n\
![Code Coverage](https://img.shields.io/badge/coverage-70%-yellow)\n\
\n\
<!-- End Code Coverage -->"
);

fs.writeFileSync("./README.md", str);
