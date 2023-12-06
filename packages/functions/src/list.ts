import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Table } from "sst/node/table";

export const main = handler(async (evt) => {
  const params: DocumentClient.QueryInput = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": evt.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.query(params);

  return JSON.stringify(result.Items);
});
