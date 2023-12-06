import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Table } from "sst/node/table";

export const main = handler(async (evt) => {
  console.log("evt:", evt.pathParameters);
  const data = JSON.parse(evt.body || "{}");

  const params: DocumentClient.UpdateItemInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: evt.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: evt!.pathParameters!.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return JSON.stringify({ status: true });
});
