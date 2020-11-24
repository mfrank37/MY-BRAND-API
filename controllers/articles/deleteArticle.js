const deleteArticle = (req, res) => {
    let found = true;
    if (found) {
        res.status(200);
        res.json({
            code: 'delete',
            message: `The article deleted now : ${req.url}`
        });
        res.send();
    } else {
        res.status(404);
        res.json({
            code: 'not-found',
            message: `Server can not find requested article : ${req.url}`
        });
        res.send();
    }
}

module.exports = deleteArticle;