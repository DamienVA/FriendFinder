const friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function(req, res) {
        
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        
        console.log(req.body);

        const userData = req.body;
        const userScores = userData.scores;

        console.log(userScores);

        let totalDifference = 0;

        for (let i = 0; i < friends.length; i++){

            console.log(friends[i]);
            totalDifference = 0;

            for (let j = 0; j < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = friends[i].totalDifference;
                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });

}