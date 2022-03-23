const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const PRIVATE_KEY =
  "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUJWUUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQVQ4d2dnRTdBZ0VBQWtFQTE3aWtLd2hSMkhlZ2NZaWYKd0Z5MEdsNHM5dFYzN1pVWk8zQ3ZDc2tlVGZhYW5qTFB6NGhQL1BpVDZNUW5hSzd1T1AvM1VjMWVDZmhqbTRHLwpTZzVnK1FJREFRQUJBa0JVQXVtVWhMbnpOcXQ2YTczaldYY2VxYnlUS0pGN0trellWRXNuUlNvVExCYmtBd2daCkVQeVQ0TjQ5SEdtQ0hlWjU3NlFlcVlmT1BDZWJORC9JeVpqeEFpRUE4Nm1SN3lieTV6dWtzTVl0VXJMWm5lR24KUHZjZFlCRGFMejlLMm1sQURJMENJUURpcE9PdGFkV0QvUXIzZkkyakZmTEJwMVlDN081TGQvTXFxdDlaMGN3SgpIUUloQUpwT05aUE5CNkMySGJxeEZmeThOS0lPU0JyUTViSnptYWk0SFZBcHZSejFBaUVBcjkzUEpmTW4wV0Y3Ckx3dWhSRmwxbzd0YlRLM1pRd3B5MERzRFVVa3drQ2tDSUUzTTVEUlo0ZHZyL3BzR1VQTDF3aUVHVkhmRmlRNkEKNngvcW9wRENiSGtICi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K"; // change this

app.set("view engine", "html");
app.set("views", __dirname);
app.engine("html", require("ejs").renderFile);

app.get("/", async (_req, res) => {
  return res.render("index.html", {
    token: jwt.sign(
      {
        user: {
          id: "customer_id",
          email: "customer@company.com",
          name: "Customer name",
        },
        org: {
          id: "company_id",
          name: "Company name",
        },
      },
      Buffer.from(PRIVATE_KEY, "base64").toString(),
      { algorithm: "RS256" }
    ),
  });
});

app.listen(4249);
