const fetch = async (
  url: string,
  init?: RequestInit,
  ms = 10_000 /* 10 seconds */
) => {
  const controller = new AbortController();

  const promise = window.fetch(url, { signal: controller.signal, ...init });

  const timeout = setTimeout(() => controller.abort(), ms);

  if (init?.signal) {
    init.signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      controller.abort();
    });
  }

  return promise.finally(() => clearTimeout(timeout));
};

export { fetch };
