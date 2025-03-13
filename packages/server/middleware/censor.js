const {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} = require('obscenity');

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

const censor = new TextCensor(); 

const filter = (req, res, next) => {
    const user = req.body.user;
    if(user){
        const matches = matcher.getAllMatches(user);
        req.body.user = censor.applyTo(user, matches);
    }

    const message = req.body.text; 
    if (message) {
        const matches = matcher.getAllMatches(message);
        req.body.text = censor.applyTo(message, matches);
    }
    next(); 
};

module.exports = filter