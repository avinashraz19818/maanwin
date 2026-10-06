const RESET_KEY = 'maanwin_runtime_reset_v4';
const ORIGINAL_RUNTIME = './index-B9u3BH9U.js';

function workerScriptUrls(registration) {
  return [registration?.active, registration?.waiting, registration?.installing]
    .map((worker) => worker?.scriptURL)
    .filter(Boolean);
}

function isMaanWinRootWorker(registration) {
  return workerScriptUrls(registration).some((scriptURL) => {
    try {
      const pathname = new URL(scriptURL, globalThis.location?.href).pathname;
      return pathname.endsWith('/ar-sw.js') || pathname.endsWith('/pwa-sw.js');
    } catch (_error) {
      return false;
    }
  });
}

export async function resetLegacyRuntime({ cacheStorage, serviceWorkerContainer }) {
  if (cacheStorage?.keys) {
    const keys = await cacheStorage.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith('ar-pwa') || key === 'online-page')
        .map((key) => cacheStorage.delete(key)),
    );
  }

  if (serviceWorkerContainer?.getRegistrations) {
    const registrations = await serviceWorkerContainer.getRegistrations();
    await Promise.all(
      registrations
        .filter(isMaanWinRootWorker)
        .map((registration) => registration.unregister()),
    );
  }
}

function resetCompleted(storage) {
  try {
    return storage?.getItem(RESET_KEY) === 'complete';
  } catch (_error) {
    return false;
  }
}

function markResetCompleted(storage) {
  try {
    storage?.setItem(RESET_KEY, 'complete');
  } catch (_error) {
    // Storage can be unavailable in privacy mode; startup must still continue.
  }
}

export async function loadMaanWinRuntime({
  cacheStorage = globalThis.caches,
  serviceWorkerContainer = globalThis.navigator?.serviceWorker,
  storage = globalThis.localStorage,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  importModule = (url) => import(url),
} = {}) {
  const runtimeUrl = new URL(ORIGINAL_RUNTIME, import.meta.url).href;
  const firstV4Boot = !resetCompleted(storage);

  if (firstV4Boot) {
    await resetLegacyRuntime({ cacheStorage, serviceWorkerContainer });
    if (fetchImpl) {
      const response = await fetchImpl(runtimeUrl, {
        cache: 'reload',
        credentials: 'same-origin',
      });
      if (!response.ok) {
        throw new Error(`Maan Win runtime refresh failed (${response.status})`);
      }
    }
  }

  const runtime = await importModule(runtimeUrl);
  if (firstV4Boot) markResetCompleted(storage);
  return runtime;
}

function showStartupError(error) {
  console.error('[Maan Win] startup failed:', error);
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#24262b;color:#fff;font:16px sans-serif;text-align:center">Maan Win could not start. Please refresh the page once.</div>';
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  loadMaanWinRuntime().catch(showStartupError);
}
