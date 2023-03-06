
const functions = require("firebase-functions");
const admin=require('firebase-admin');

admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions
.region('europe-west1')
.https.onRequest((request, response) => {
  
  response.send("Hello World!");
});

exports.get_courses=functions.region('europe-west1')
.https.onRequest((request,response)=>{
admin
.firestore()
.collection('courses')
.get()
.then(data=>{
    let courses=[];
    data.forEach(doc=>{
    courses.push(doc.data());
    });
    return response.json(courses);
})
.catch(err=>console.error(err))
})

exports.create_course=functions.region('europe-west1').https.onRequest((req,res)=>{

  const todayAsTimestamp = admin.firestore.FieldValue.serverTimestamp();
  const new_course={
    description:req.body.description,
    title:req.body.title,
    created_at:todayAsTimestamp
  }

  admin.firestore()
  .collection('courses')
  .add(new_course)
  .then(doc=>{
    res.json({message:`document${doc.id} created successfully!`})
  })
  .catch(err=>{
    res.status(500).json({error:'something went wrong'});
    console.error(err);
  })
});
