export const readableBytes = bytes => {
  var i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // there should be a better way to do this lol
  return bytes != 0
    ? (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i]
    : "0 B";
};

export const toDateTime = secs => {
  var date = new Date(secs);
  return (
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }) +
    " " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })
  );
};
