'use strict';

var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://dynamodb:8000'
});
var params, response;

exports.handler = (event, context, callback) => {
    try {
      params = {
          TableName : 'notes',
      };

      response = {
          'statusCode': 200
      }

      documentClient.scan(params, (err, data) => {
          if (err) console.log(err);
          else {
              response.body = JSON.stringify(data.Items);
              callback(null, response)
          }
      });
    }
    catch (err) {
        callback(err, null);
    }
};
