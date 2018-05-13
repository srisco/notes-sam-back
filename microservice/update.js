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
            Key: {
                id: event.pathParameters.noteId
            },
            UpdateExpression: "set title = :t, body=:b, color=:c, modified=:m",
            ExpressionAttributeValues: {
                ":t": JSON.parse(event.body).title,
                ":b": JSON.parse(event.body).body,
                ":c": JSON.parse(event.body).color,
                ":m": JSON.parse(event.body).modified
            }
        };

        documentClient.update(params, function(err, data) {
            if (err) console.log(err);
            else {
                callback(null, {
                    statusCode: 200
                });
            }
        });
    }
    catch(err){
        callback(err, null);
    }
};
