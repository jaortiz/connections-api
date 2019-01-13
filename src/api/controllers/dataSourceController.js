import { Router } from "express";
import Client from "ssh2-sftp-client";
const router = Router();
let sftp = new Client();

router.get("*", (req, res) => {
  const path = req.params[0] === "" ? "/" : req.params[0];

  // change below to whatever sftp server credentials
  sftp
    .connect({
      host: "0.0.0.0",
      port: "22",
      username: "tester",
      password: "password"
    })
    .then(() => {
      return sftp.list(path);
    })
    .then(data => {
      let directory = {};

      // for now will default to folder since the files wouldnt be clickable
      directory[path] = { path: path, type: "folder", children: [] };
      if (path === "/") directory[path]["isRoot"] = true;
      data.forEach(elem => {
        const fullPath =
          path === "/" ? path + elem.name : path + "/" + elem.name;
        directory[path].children.push(fullPath);
        if (elem.type === "d") {
          directory[fullPath] = {
            path: fullPath,
            type: "folder",
            children: []
          };
        } else if (elem.type == "-") {
          directory[fullPath] = { path: fullPath, type: "file" };
        }
      });
      sftp.end();
      console.log(directory);
      res.send(directory);
    })
    .catch(err => {
      console.log(err, "catch error");
    });
});

export default router;
