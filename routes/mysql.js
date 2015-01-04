var ejs= require('ejs');
var mysql = require('mysql');
var dataPool=require('../routes/ConnectionPooling');

/*function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'prabhu',
	    password : '$pBu195986',
	    database : 'virtualmarketplace'
	});
	return connection;
}*/

function updateData_normal(sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=dataPool.getConnection();
	connection.query(sqlQuery,function(err, rows, fields) {
		if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			console.log("Values Update ");
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}

function insertData_normal(sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=dataPool.getConnection();
	connection.query(sqlQuery,function(err, rows, fields) {
		if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			console.log("Values Update ");
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}

function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}	

function insertData(callback,sqlQuery,post){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery, post ,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}	
function updateData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}
function deleteData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=dataPool.getConnection();
	
	connection.query(sqlQuery,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	dataPool.returnConnection(connection);
}




exports.deleteData=deleteData;
exports.fetchData=fetchData;
exports.insertData=insertData;
exports.updateData=updateData;
exports.insertData_normal=insertData_normal;
exports.updateData_normal=insertData_normal;
