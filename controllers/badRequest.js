const badRequest = (req, res) => {
    res.status(400).send({
        code: "bad-request",
        message: "Not found | Invalid | bad requests"
    });
}
module.exports = badRequest;