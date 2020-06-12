const hadleSignin = (db, bcrypt) => (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Wrong data');
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Wrong user'))
            } else {
                res.status(400).json('Wrong authentication')
            }
            //console.log(data);
        })
        .catch(err => res.status(400).json('Wrong authentication'))
}

module.exports = {
    hadleSignin: hadleSignin
};