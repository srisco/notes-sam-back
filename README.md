# notes-sam-back

This is a simple REST API to test AWS Lambda, API Gateway and DynamoDB functionality using sam local.


## Requirements

* AWS CLI already configured with at least PowerUser permission
* [SAM CLI installed](https://github.com/awslabs/aws-sam-cli)
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

## Setup process

### Installing dependencies

In this example we use `npm` but you can use `yarn` if you prefer to manage NodeJS dependencies:

```bash
cd microservice
npm install
cd ../
```

### Local development

To work with DynamoDB in a local container, you may create a docker network and specify it when starting REST API and container.

**Creating network and running the DynamoDB local container**

```bash
docker network create lambda-local
docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local
```

Remember the `--name` parameter to allow functions to access the database server.

**Creating the table in DynamoDB**

```bash
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name notes --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

**Invoking function locally through local API Gateway**

```bash
sam local start-api --docker-network lambda-local
```

If the previous command ran successfully you should now be able to hit the following local endpoint to invoke your function `http://localhost:3000/notes`

**SAM CLI** is used to emulate both Lambda and API Gateway locally and uses our `template.yaml` to understand how to bootstrap this environment (runtime, where the source code is, etc.) - The following excerpt is what the CLI will read in order to initialize an API and its routes:

```yaml
...
Events:
    Read:
        Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
        Properties:
            Path: /notes
            Method: get
```

