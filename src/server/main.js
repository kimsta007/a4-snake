import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const appdata = [
  { name: "Kay", score: 132, date: (new Date("July 6, 2023 1:23:45 AM")).toDateString() },
  { name: "Taylor", score: 42, date: (new Date("September 8, 2024 2:30:00 PM")).toDateString() },
  { name: "test", score: 1, date: (new Date()).toDateString()},
];

const sortAndSend = function (req, resp) {
    appdata.sort(function (a, b) {
      return b.score - a.score;
    });
    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(appdata));
};

app.post('/submit', async (req, res) => {
      const data = req.body;
      let updated = false;
      for (var i = 0; i < appdata.length; i++) {
        if (data.name === appdata[i].name) {
          appdata[i].score = data.score;
          updated = true;
        }
      }
      if (!updated) {
        console.log("name " + data.name);
        appdata.push({ name: data.name, score: data.score, date: (new Date()).toDateString() });
      }
      sortAndSend(request, response);

  });

app.post('/delete', async (req, res) => {
      const data = red.body;
      let idx = undefined;
      for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].name === data.name) {
          idx = i;
        }
      }
      if (idx != undefined) {
        console.log("Deleting.");
        appdata.splice(idx, 1);
      }
      sortAndSend(request, response);
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
