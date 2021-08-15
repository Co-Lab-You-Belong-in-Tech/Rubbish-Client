/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const { DynamoDBClient, GetItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const dynamoClient = new DynamoDBClient({ region: "us-east-2" });

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "*")

  next()
});


/**********************
 * Get method *
 **********************/

app.get('/api', function(req, res) {
  // Add your code here
  res.json({success: 'Get Call Received from API root', url: req.url});
});

// app.get('/api/*', function(req, res) {
//   // Add your code here
//   console.log(req);
//   res.json({success: 'Get call succeed!', url: req.url});
// });

// Read from DDB. Format: /api/DB/tablename?query
app.get('/api/DB/:table', async function(req, res) {
  let ret, queryType;
  let statusCode = 200;
  const tableName = req.params.table;

  if(req.query.UserID) {
    queryType = 'GetItem';
    try {
      const command = new GetItemCommand({
        TableName: tableName,
        Key: {
          'UserID': {S: req.query.UserID},
          'CreationTime': {S: req.query.CreationTime}
        }
      });
      ret = await dynamoClient.send(command);
    } catch (err) {
      statusCode = 400;
      console.log(err);
      ret = err.name;
    } finally {
      console.log(ret.Item);
      ret = JSON.stringify(ret.Item);
    }
  } else {
    queryType = 'ScanTable';
    try {
      const command = new ScanCommand({ TableName: tableName });
      ret = await dynamoClient.send(command);
    } catch (err) {
      statusCode = 400;
      console.log(err);
      ret = err.name;
    } finally {
      console.log(ret.Items);
      ret = JSON.stringify(ret.Items);
    }
  }

  res.json({desc: `Get: Read Query to table ${tableName}, queryType: ${queryType}`, url: req.url, status: statusCode, return: ret});
});

/****************************
* Example post method *
****************************/

app.post('/api', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/api', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/api', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/api/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
