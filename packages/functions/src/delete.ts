import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
  await dynamoDb.delete({
    TableName: Table.Notes.tableName,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters!.id,
    },
  });

  return JSON.stringify({ status: true });
});
