import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
  const params = {
    Tablename: Table.Notes.tableName,
    Key: {
      userId: "123",
      noteId: event?.pathParameters?.id,
    },
  };

  const result = await dynamoDb.get({
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event!.pathParameters!.id,
    },
    TableName: Table.Notes.tableName,
  });

  if (!result.Item) {
    throw new Error("Item not found");
  }

  return JSON.stringify(result.Item);
});
