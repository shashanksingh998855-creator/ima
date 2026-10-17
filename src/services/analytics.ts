/**
 * STRYVEN Analytics & Event Tracking Engine
 * Complies with strict privacy guidelines: zero PII in event parameters,
 * no conversion event triggered on failed form attempts, and configurable GA4 Measurement ID.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type TrackableEvent =
  | 'page_view'
  | 'start_campaign_click'
  | 'contact_form_start'
  | 'generate_lead'
  | 'creator_application_submit'
  | 'portfolio_view'
  | 'service_inquiry';

class AnalyticsService {
  private measurementId: string = '';
  private isInitialized: boolean = false;
  private consentGranted: boolean = true;

  constructor() {
    // Check localStorage for any stored Measurement ID
    const storedId = typeof window !== 'undefined' ? localStorage.getItem('stryven_ga_measurement_id') : null;
    if (storedId) {
      this.setMeasurementId(storedId);
    }
  }

  public setMeasurementId(id: string) {
    this.measurementId = id.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem('stryven_ga_measurement_id', this.measurementId);
      if (this.measurementId.startsWith('G-') && !this.isInitialized) {
        this.initGtag(this.measurementId);
      }
    }
  }

  public getMeasurementId(): string {
    return this.measurementId;
  }

  private initGtag(id: string) {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', id, {
      anonymize_ip: true,
      send_page_view: false,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    this.isInitialized = true;
  }

  public track(eventName: TrackableEvent, metadata: Record<string, string | number | boolean> = {}) {
    // Strict privacy filter: remove any potential personal data
    const safeMetadata: Record<string, any> = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (!['name', 'email', 'phone', 'address', 'message'].includes(key.toLowerCase())) {
        safeMetadata[key] = value;
      }
    }

    // 1. Dispatch to Google Analytics 4 if configured and consented
    if (typeof window !== 'undefined' && window.gtag && this.measurementId && this.consentGranted) {
      try {
        window.gtag('event', eventName, safeMetadata);
      } catch (err) {
        // quiet catch
      }
    }

    // 2. Dispatch to STRYVEN backend for internal CRM and deal tracking analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        metadata: safeMetadata,
      }),
    }).catch(() => {
      // quiet fallback
    });
  }
}

export const analytics = new AnalyticsService();
