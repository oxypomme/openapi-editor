import { createId } from '@paralleldrive/cuid2';
import OASNormalize from 'oas-normalize';
import type { OASDocument } from 'oas/types';

import { existsSync } from 'node:fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No path provided',
    });
  }

  if (!existsSync(body.path)) {
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${body.path}`,
    });
  }

  let definition: OASDocument;
  try {
    const oas = new OASNormalize(body.path, { enablePaths: true });

    definition = await oas.validate();
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Couldn't parse file: ${error}`,
    });
  }

  const id = `openapi-${createId()}`;
  try {
    const storage = useStorage();
    await storage.setItem(id, definition);
  } catch (error) {
    throw createError(error as Error);
  }

  return {
    id,
    name: definition.info.title,
    version: definition.info.version,
    oas: definition.openapi,
  };
});
