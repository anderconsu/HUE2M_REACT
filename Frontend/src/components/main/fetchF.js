async function fetchWithTimeout(url, opts = {}, timeout = 5000) {
    // Create a signal with timeout
    const signal = AbortSignal.timeout(timeout);
  
    // Make the fetch request
    const _fetchPromise = fetch(url, {
      ...opts,
      signal,
    });
  
    // Await the fetch with a catch in case it's aborted which signals an error
    const result = await _fetchPromise;
    return result;
  };
export default fetchWithTimeout