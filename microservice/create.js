'use strict';

var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://dynamodb:8000'
});
var params, response;

exports.handler = (event, context, callback) => {
    try{
        params = {
            TableName: 'notes',
            Item: JSON.parse(event.body)
        };

        response = {
            'statusCode': 200
        }

        documentClient.put(params, function(err, data) {
            if (err) console.log(err);
            else {
                callback(null, response);
            }
        });
    }
    catch(err) {
        callback(err, null);
    }
};
