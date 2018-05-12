
let response;


exports.handler = async (event, context, callback) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'update works!!'
            })
        }
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }

    callback(null, response)
};
