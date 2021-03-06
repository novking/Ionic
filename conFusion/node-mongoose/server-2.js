var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./model/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log("Connected correctly to the server");
    
    Dishes.create({
        name: 'Upizza',
        description: 'Good'
    },
        function(err, dish){
            if (err) throw err;
            console.log('Dish created!');
        console.log(dish);
        
        var id = dish._id;
        
        setTimeout(function(){
            Dishes.findByIdAndUpdate(id,{
                $set: {
                    description: 'Excellent'
                }
            },{
                new: true
            })
            .exec(function(err, dish){
                if (err) throw err;
                console.log("updated dish!");
                console.log(dish);
                
                db.collection('Dishes').drop(function(){
                    db.close();
                });
            });
        },3000);
    });
});