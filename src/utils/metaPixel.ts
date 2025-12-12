// Meta Pixel tracking utility
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export type MetaPixelEvent =
  | 'PageView'
  | 'Lead'
  | 'Purchase'
  | 'Contact'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'CompleteRegistration';

export interface PixelEventData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  num_items?: number;
  custom_properties?: Record<string, unknown>;
  [key: string]: unknown;
}

export const trackEvent = (event: MetaPixelEvent, data?: PixelEventData) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('track', event, data);
    } else {
      window.fbq('track', event);
    }
  }
};

export const trackCustomEvent = (eventName: string, data?: PixelEventData) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('trackCustom', eventName, data);
    } else {
      window.fbq('trackCustom', eventName);
    }
  }
};

// Specific tracking functions for common events
export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackTestCompletion = (level: string, score: number, language: string) => {
  trackEvent('Lead', {
    content_name: `${language} Test ${level}`,
    content_category: 'language_test',
    value: score,
    currency: 'PLN',
    custom_properties: {
      test_level: level,
      test_language: language,
      test_score: score
    }
  });
};

export const trackContactClick = (contactMethod: 'whatsapp' | 'email') => {
  trackEvent('Contact', {
    content_name: contactMethod,
    content_category: 'contact',
    custom_properties: {
      contact_method: contactMethod
    }
  });
};

export const trackTestStart = (level: string, language: string) => {
  trackEvent('InitiateCheckout', {
    content_name: `${language} Test ${level}`,
    content_category: 'language_test',
    custom_properties: {
      test_level: level,
      test_language: language
    }
  });
};
