/**
 * New node file
 */
var ejs=require("ejs");
var mysql=require("./mysql");
function checkOut(req,res)
{
	var ssn=req.session.ssn;

	var getUser="select * from shoppingCart where buyerId='"+ssn+"'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var productName=[];
				var price=[];
				var quantity=[];
				var total=[];
				var finalTotal=[];
				var finalValue=0;
				for(var i=0;i<results.length;i++)
				{
					productName[i]=results[i].productName;
					price[i]=results[i].price;
					quantity[i]=results[i].quantity;
					total[i]=price[i]*quantity[i];
					finalTotal[i] = parseInt(total[i]);
					finalValue += finalTotal[i];


				}


				console.log("Total"+finalValue);
				//console.log(one);
				console.log("valid Seller");
				ejs.renderFile('./views/payment.ejs',{productName:productName,price:price,quantity:quantity,total:total,finalValue:finalValue},function(err, result) {

					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    
				console.log("Invalid Seller");
				ejs.renderFile('./views/fail.ejs',{msg:"No Ratings are ther please add your ratings"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getUser);

}
function toPay(req,res)
{
	var count=0;
	//var buyerId="99999999";
var buyerId=req.session.ssn;
	var getUser="select * from shoppingCart where buyerId='"+buyerId+"'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{

			if(results.length > 0){
				var productId=[];
				var productType=[];
				var state=[];
				var productName=[];
				var price=[];
				var quantity=[];
				var total=[];
				var finalTotal=[];
				var finalValue=0;
				for(var i=0;i<results.length;i++)
				{
					productId[i]=results[i].productId;

					productType[i]=results[i].productType;
					state[i]=results[i].state;
					productName[i]=results[i].productName;
					price[i]=results[i].price;

					quantity[i]=results[i].quantity;
					total[i]=price[i]*quantity[i];
					finalTotal[i] = parseInt(total[i]);
					finalValue += finalTotal[i];

					var productId1=productId[i];
					var quantity1=results[i].quantity;
					var productName1=productName[i];
					var price1=price[i];
					var category1=results[i].category;
					var validity=1;
					//var sellerId="1000";


					/*quantity=parseInt(quantity[i]);
productId=parseInt(productId[i]);
					 */
					console.log(productId+"ID");
					console.log("results"+JSON.stringify(results));

					console.log("results"+results[i].productId);

//					updateing product table
					var updateData="update product set quantity=quantity-'"+quantity1+"'"+"where productId='"+productId1+"'";

					mysql.updateData_normal(updateData);
//					inserting into history
					var updateData1="insert into history(userId,itemsBought,itemsSold) values('"+buyerId+"'"+",'"+productName1+"'"+",' ')";

					mysql.insertData_normal(updateData1);

//					inserting into selling
		/*			var updateData2="insert into selling(sellerId,quantity,price,productId,category,validity,buyerId) values('"+sellerId+"'"+",'"+quantity1+"'"+",'"+price1+"'"+",'"+productId1+"'"+",'"+category1+"'"+",'"+validity+"'"+",'"+buyerId+"'"+")";

					mysql.insertData_normal(updateData2);*/


				}


				console.log("Total"+finalValue);

				ejs.renderFile('./views/toPay.ejs',{productName:productName,price:price,quantity:quantity,total:total,finalValue:finalValue},function(err, result) {

//					render on success
					if (!err) {
						res.end(result);
					}
//					render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {    
				console.log("Invalid Seller");
				ejs.renderFile('./views/fail.ejs',{msg:"No Ratings are ther please add your ratings"},function(err, result) {
//					render on success
					if (!err) {
						res.end(result);
					}
//					render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getUser);




}
exports.checkOut=checkOut;
exports.toPay=toPay;
