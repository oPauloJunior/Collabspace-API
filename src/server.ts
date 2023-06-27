import { app } from "./shared/app";

app.listen(process.env.APP_PORT, () => {
  console.log("🚀 HTTP Server is running!");
});
