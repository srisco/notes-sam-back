'use strict';

var AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://dynamodb:8000'
});
var params;

exports.handler = (event, context, callback) => {
    try{
        params = {
            TableName: 'notes',
            Item: JSON.parse(event.body)
        };

        documentClient.put(params, (err, data) => {
            if (err) console.log(err);
            else {
                callback(null, {
                    statusCode: 200
                });
            }
        });
    }
    catch(err) {
        callback(err, null);
    }
};
