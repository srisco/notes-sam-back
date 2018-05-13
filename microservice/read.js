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

      documentClient.scan(params, (err, data) => {
          if (err) console.log(err);
          else {
              callback(null, {
                  statusCode: 200,
                  body: JSON.stringify(data.Items)
              })
          }
      });
    }
    catch (err) {
        callback(err, null);
    }
};
