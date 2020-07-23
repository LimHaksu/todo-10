function checkUser(req, res) {
  if (!req.user) {
    res.status(401);
    res.json({
      error: "Invalid user",
    });
    return false;
  } else return true;
}

export default checkUser;
