const cache = new Map();

// Helper to structure a clean cache key based on route path, method and URL parameters
function getCacheKey(config) {
  const paramsStr = config.params ? JSON.stringify(config.params) : "";
  const queryStr = config.url.includes("?") ? config.url.split("?")[1] : "";
  const cleanUrl = config.url.split("?")[0];
  return `${config.method}:${cleanUrl}:${paramsStr}:${queryStr}`;
}

export function setupCachingInterceptor(apiClient) {
  apiClient.interceptors.request.use(
    (config) => {
      // Only cache safe GET requests to protect write operations
      if (config.method.toLowerCase() === "get") {
        const cacheKey = getCacheKey(config);
        const cached = cache.get(cacheKey);

        if (cached) {
          const now = Date.now();
          // Cache validity duration: 5 seconds (5000ms) to prevent double/rapid page loading fetches
          if (now - cached.timestamp < 5000) {
            config.adapter = () => {
              return Promise.resolve({
                data: JSON.parse(JSON.stringify(cached.data)),
                status: 200,
                statusText: "OK",
                headers: {},
                config,
                request: {},
              });
            };
          } else {
            cache.delete(cacheKey);
          }
        }
      } else {
        // Invalidate entire cache on non-GET mutations (POST, PATCH, DELETE) to guarantee consistency
        cache.clear();
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => {
      const config = response.config;
      if (config.method.toLowerCase() === "get") {
        const cacheKey = getCacheKey(config);
        cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      }
      return response;
    },
    (error) => Promise.reject(error)
  );
}
