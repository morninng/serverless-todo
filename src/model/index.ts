import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
  console.log(' -- dynamoDBClient -- ', process.env.IS_OFFLINE);

  if (process.env.IS_OFFLINE === 'true') {
    console.log(' -------- offline ------');
    const dbclient = new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    });
    return dbclient;
  }
  console.log(' -------- online ------');
  return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient