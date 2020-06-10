//where precyzuje konkretne wartosci.
//jezeli wartosc i wlasciwosc maja ta sama nazwe to mozna np. { id }, przeciwnie { id: klucz }

const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({ id })
        .then(user => {
            //console.log(user[0]);
            if (user.lenght) {
                res.json(user[0])
            } else {
                res.status(400).json('User not found')
            }
        })
        .catch(err => res.status(400).json('User not found'))

    //if (!found) {
    //    res.status(404).json('User not found');
    //}
}

module.exports = {
    handleProfile
};