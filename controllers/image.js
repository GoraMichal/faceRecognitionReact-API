const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        //.update({ entries:  })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
            //console.log(entries);
        })
        .catch(err => res.status(400).json('Entries error'))
}

module.exports = {
    handleImage: handleImage
};