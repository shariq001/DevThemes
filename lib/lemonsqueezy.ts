import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

/**
 * Initializes the Lemon Squeezy SDK with the API key from environment variables.
 * Call this function before making any Lemon Squeezy API requests.
 */
export function setupLemonSqueezy() {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error('LEMON_SQUEEZY_API_KEY is missing in environment variables.');
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error('Lemon Squeezy API Error:', error);
    },
  });
}
