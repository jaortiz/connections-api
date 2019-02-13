import { Router } from "express";
import Client from "ssh2-sftp-client";
import { readableBytes, toDateTime } from "../../utils/format";
import { decrypt } from "../../utils/decrypt";

const router = Router();

router.post("/directory", (req, res) => {
  let { path, host, username, password } = req.body;

  let sftp = new Client();
  sftp
    .connect({ host, port: "22", username, password: decrypt(password) })
    .then(() => {
      return sftp.list(path);
    })
    .then(data => {
      let directory = {};

      // for now will default to folder since the files wouldnt be clickable for this POC
      directory[path] = { path: path, type: "folder", children: [] };
      data.forEach(elem => {
        const fullPath =
          path === "/" ? path + elem.name : path + "/" + elem.name;
        directory[path].children.push(fullPath);
        // need a better way to handle symlinks
        if (elem.type === "d" || elem.type === "l") {
          directory[fullPath] = {
            path: fullPath,
            type: "folder",
            fileSize: "-",
            lastModified: "-",
            children: []
          };
        } else {
          directory[fullPath] = {
            path: fullPath,
            type: "file",
            fileSize: readableBytes(elem.size),
            lastModified: toDateTime(elem.modifyTime)
          };
        }
      });

      sftp.end();
      console.log(directory);
      res.send(directory);
    })
    .catch(err => {
      console.log("SFTP ERROR");
      console.log(err);
      sftp.end();
      res.sendStatus(400);
    });
});

export default router;
