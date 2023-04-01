import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event.body);
  return formatJSONResponse({
    message: `Hello , welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = hello;
