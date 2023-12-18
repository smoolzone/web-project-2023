const jwt = require("jsonwebtoken");
const { User } = require("./../models/user.schema");

verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader === 'undefined') return res.status(403).send("Access denied.");

        const token = bearerHeader.split('Bearer ')[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

isAdmin = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id);
        if (user && user.isAdmin) {
            next();
            return;
        }
        else {
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        }
    }
    catch(err) {
        res.status(500).send({ message: err });
        return;
    }
};

isBusinessUser = (req, res, next) => {
  if(req.user && req.user.isBusiness) next();

  res.status(403).send("Access denied");
};

const authJwt = {
  verifyToken,
  isAdmin,
  isBusinessUser
};

module.exports = authJwt;