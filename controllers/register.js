const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;

    //Z retrun dalsza czesc kodu sie nie wyswietli
    if (!email || !name || !password) {
        return res.status(400).json('Wrong data');
    }

    var hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date
                    })
                    //.then(console.log);
                    .then(user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
    })
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleRegister: handleRegister
};