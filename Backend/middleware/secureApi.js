let secureApi = (req, res, next) => {
    let { SECURE_API } = process.env;
    if (req.headers.authorization == SECURE_API) {
        next();
    } else {
        res.send({ error: "Don't have assess permission" });
    }
};

module.exports = secureApi;
