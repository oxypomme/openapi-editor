import OAS from 'oas';
import type { OASDocument } from 'oas/types';

// eslint-disable-next-line import/prefer-default-export
export const useOAS = async (id?: string) => {
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No id provided',
    });
  }

  const storage = useStorage();
  const data = await storage.getItem<OASDocument>(id);
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: `Definition ${id} not found`,
    });
  }

  return new OAS(data);
};
