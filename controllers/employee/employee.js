var express = require('express');
var adminmodel = require('../../models/adminmodel');
var router = express.Router();


router.get('*', function (request, response, next) {

        if (request.session.loginemail != null && request.session.usertypes=="employee") {
            next();
        } else {
            response.redirect('/logout');
        }
    
 });


router.get('/', function(req, res){
    
        res.render('employee/employeehome');
   
	
});

router.get('/AddProduct', function(req, res){
    
        res.render('employee/addproducts');
   
	
});

router.get('/report', function(req, res){

        adminmodel.getReport(function(result){

                res.render('admin/adminreport',{result:result});
        })

    
   
	
});

router.get('/AllProducts', function(req, res){

        adminmodel.ViewProducts(function(result){

                res.render('employee/employeeproducts',{result:result});
        })

    
   
	
});

router.get('/notice', function(req, res){

              res.render('admin/adminnotice',{sessionid:req.session.userid});
   
	
});

router.get('/viewpost/:id', function(req, res){

        var postid = req.params.id;
        adminmodel.viewPost(postid,function(result){
                res.render('admin/adminviewpost',{result:result});
        })         
	
});

//new working for profile view
router.get('/viewproduct/:name', function(req, res){

        var name = req.params.name;
        adminmodel.viewProduct(name,function(result){
                res.render('employee/employeeviewproduct',{result:result});
        })         
	
});

router.post('/deletepost', function(req, res){

        var posterid = req.body.posterid;
        var postid = req.body.postid;
        adminmodel.deletePost(postid,function(status){
                if(status){
                        adminmodel.increaseStrike(posterid,function(status){
                                if(status){
                                        res.redirect('/admin/report');

                                }
                                else{

                                }
                        })
                }
                else{

                        res.redirect('/admin/report');


                }
        })         
	
});

router.post('/deleteproduct', function(req, res){

        var name = req.body.name;
       // var postid = req.body.postid;
        console.log(name);
        adminmodel.deleteProduct(name,function(status){
                if(status){
                        res.redirect('/employee');
                }
                else{

                        res.redirect('/employee');


                }
        })         
	
});


// current
router.post('/sendNotice', function(req, res){

        var value={
                id:req.body.userid,
                notice: req.body.noticebox
        }
        adminmodel.sendNotice(value,function(status){

                if(status){
                        res.redirect('/admin');
                }
                else{

                        res.redirect('/admin');


                }

        })
  
	
});


router.post('/updateproduct', function(req, res){

        var value={
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
        }

        adminmodel.updateProduct(value,function(status){

                if(status){
                        res.redirect('/employee');
                }
                else{

                        res.redirect('/employee');


                }

        })


});


router.post('/AddProduct', function(req, res){

        var value={
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price
        }

        adminmodel.AddProduct(value,function(status){

                if(status){
                        res.redirect('/employee');
                }
                else{

                        res.redirect('/employee');


                }

        })


});







module.exports = router;