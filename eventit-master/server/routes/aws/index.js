   

const awsRoute = require('./controller');



const router = app => {

    app.use('/sign_s3',awsRoute);

}



module.exports=router;