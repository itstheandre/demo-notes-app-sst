import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: `Hello world. The time is ${new Date().toISOString()}`,
      yourMom: Math.random() > 0.5,
      go: true,
      isEsspain: false,
    }),
  };
});
