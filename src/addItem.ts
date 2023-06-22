import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const docClient = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME as string;

export const handler = async (event) => {
  const { name, type, price } = event.body;
  const id = uuidv4();
  const newItem = {
    PK: `PK#${id}`,
    SK: `SK#${type}`,
    name: name ?? "",
    type: type ?? "",
    price: price ?? "",
  }

  const result = await docClient
    .put({
      TableName: tableName,
      Item: newItem
    })
    .promise();

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: newItem
  };

  return response;
};
