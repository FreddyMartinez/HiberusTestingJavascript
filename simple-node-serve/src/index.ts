import app from "./app";
import dbInstance from "./dal/dabInstance";

dbInstance.sync().then(() => {
  console.log("Database ready");
});

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

