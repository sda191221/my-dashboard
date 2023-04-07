const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/users", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users");
  const user = users.find((user) => user.email === email);
  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    users.push({ email, password });
    res.json({ message: "User created successfully" });
  }
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users");
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    router.db.get("login").push({ email, password });
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});