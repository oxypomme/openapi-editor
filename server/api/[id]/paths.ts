import type { Operation, Webhook } from 'oas/operation';

import { useOAS } from '~/server/utils/useOAS';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const oas = await useOAS(id);
  const oasPaths = oas.getPaths();

  const pathsPerTag = new Map<string, (Webhook | Operation)[]>();
  Object.values(oasPaths).forEach(
    (methods) => {
      Object.values(methods).forEach(
        (spec) => {
          const setPath = (tag: string) => {
            const pathsOfTag = pathsPerTag.get(tag) ?? [];
            pathsOfTag.push(spec);
            pathsPerTag.set(tag, pathsOfTag);
          };

          const tags = spec.getTags();
          if (tags.length) {
            tags.forEach(({ name: tag }) => setPath(tag));
            return;
          }

          setPath('');
        },
      );
    },
  );

  return [...pathsPerTag].map(
    ([tag, paths]) => ({
      tag,
      paths: paths.map(
        ({ path, method }) => ({
          path,
          method,
        }),
      ),
    }),
  );
});
