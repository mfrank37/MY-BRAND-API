const getAllArticles = (req, res) => {
    res.status(200).send([{
            title: 'title1',
            body: 'body1'
        },
        {
            title: 'title2',
            body: 'body2'
        }
    ]);
}

module.exports = getAllArticles;