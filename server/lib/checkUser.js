function checkUser(req, res) {
  if (req.user) return true;
  else {
    res.status(401);
    res.json({ error: "Invalid user" });
    return false;
  }
}

export default checkUser;
