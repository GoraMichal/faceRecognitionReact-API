const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e5cfe46a4d4249f78042737e94c25c0b'
});

const handleApiClarifai = (req, res) => {
app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(res => res.status(400).json('incorrect image'))
} 


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
    handleImage: handleImage,
    handleApiClarifai: handleApiClarifai
};