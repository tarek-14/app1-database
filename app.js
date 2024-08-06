const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-db'

mongoClient.connect(connectionUrl, (error, result) => {
    if (error) {
        return console.log('error has occured')
    }
    console.log('All Pref')
    const db = result.db(dbName)

    //    >>>>> add tow document using insertOne
    db.collection('users').insertOne({
        name: 'tarek',
        age: 20
    }, (error, data) => {
        if (error) {
            return console.log("Unabel to insert data (insertOne 1)")
        }
        console.log(data.insertedId)
    })
    db.collection('users').insertOne({
        name: 'Ahmed',
        age: 24
    }, (error, data) => {
        if (error) {
            return console.log("Unabel to insert data(insertOne 2)")
        }
        console.log(data.insertedId)
    })
    //--------------------------------------------------------------

     //>>>>>add 10 document using inserMany , 5 of them are 27 years old
    db.collection('users').insertMany(
        [
            {
                name: "islam",
                age: 28
            },
            {
                name: "mohamed",
                age: 27
            }, {
                name: "esraa",
                age : 39
            }, {
                name: "abdelrhman",
                age: 20
            }, {
                name: "saad",
                age: 27
            }, {
                name: "zizo",
                age: 27
            }, {
                name: "ali",
                age: 27
            }, {
                name: "Asmaa",
                age: 30
            }, {
                name: "yaser",
                age: 27
            }, {
                name: "karma",
                age: 50
            },
        ] , 
        (error, data) => {
            if (error) {
                return console.log("Unabel to insert data (inserMany)")
            }
            console.log(data.insertedCount)
        }
    )
    /////--------------------------------------------------------------

    ////>>>>> Show all up to 27 years old
    db.collection('users').find({age:27}).toArray((error,users27)=>{
        if (error){
           return console.log("error read uders")
        }
        console.log(users27)
    })
    //-----------------------------------------------------------

    //>>>> Show the first 3 who are 27 years old
    db.collection('users').find({age:27}).limit(3).toArray((error,users27)=>{
        if (error){
           return console.log("error read uders")
        }
        console.log(users27)
    })
    //--------------------------------------------------------------------

    //>>>> Modify the name of the first four ducment in the database
    db.collection('users').find({}).limit(4).forEach(doc => {
        const ids = [doc._id]
        db.collection('users').updateMany(
            {
                _id: { $in: ids }
            },
            {
                $set: { name: "aya" }
            }
        )
    });
    // ---------------------------------------------------
    ///>>>>Add 4 years for the first four ducment age 27 in the database    
    db.collection('users').find({age : 27}).limit(4).forEach(doc => {
            const ids = [doc._id]
            db.collection('users').updateMany(
                {
                    _id: { $in: ids }
                },
                {
                    $inc: { age: 4 }
                }
            )
        });
////----------------------------------------------------------------------

 //>>>> Modify add 10y to age all ducment us $inc
    db.collection('users').updateMany({},{
        $inc: {age : 10 }
    }).then((data1)=>{console.log(data1.modifiedCount)})
    .catch((error)=>{console.log(error)})
    //-------------------------------------------
    //>>>>>Delete all up to the age of 41 

    db.collection('users').deleteMany({age : 41})
    .then((data1)=>{console.log(data1.deletedCount)})
    .catch((error)=>{console.log(error)})




})