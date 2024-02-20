/* eslint-disable import/prefer-default-export */
type APIInfo = {
  name: string,
  version: string,
  oas: string,
};

type PathItem = {
  tag: string,
  paths: {
    path: string,
    method: string,
  }[],
};

export const useSwaggerStore = defineStore('swaggerStore', () => {
  const id = ref<string | undefined>();
  const file = ref<string>('');

  const apiInfo = ref<APIInfo | undefined>();
  const apiPaths = ref<PathItem[]>([]);

  const fetchPaths = async () => {
    const data = await $fetch(`/api/${id.value}/paths`);
    apiPaths.value = data;
  };

  const loadFile = async (path: string) => {
    file.value = path;
    const data = await $fetch('/api/load', { method: 'POST', body: { path } });

    id.value = data.id;
    apiInfo.value = {
      name: data.name,
      version: data.version,
      oas: data.oas,
    };

    fetchPaths();

    return data;
  };

  return {
    id,
    file,

    api: {
      info: computed(() => apiInfo.value),
      paths: computed(() => apiPaths.value),
    },

    loadFile,
  };
});
