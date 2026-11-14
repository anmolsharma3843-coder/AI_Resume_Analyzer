import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  const token = jwt.sign( { id: user._id, email: user.email, }, process.env.JWT_SECRET, { expiresIn: "5d" } );

  res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,       // false for localhost
  sameSite: "None",
    domain: "localhost",    // required for cross‑port (3000 → 5000)
  maxAge: 5 * 24 * 60 * 60 * 1000,
});
  console.log(token)
  return token;
};;

export { generateToken };