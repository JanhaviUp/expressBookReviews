let users = [];

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  users.push({ username, password });

  return res.json({ message: "User registered successfully" });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});
