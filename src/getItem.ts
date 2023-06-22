import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;

export const handler = async (event) => {
  const { id, type } = event.query;

  const result = await docClient
    .get({
      TableName: tableName,
      Key: {
        PK: `PK#${id}`,
        SK: `SK#${type}`
      },
    })
    .promise();

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: result.Item
  };

  return response;
};
