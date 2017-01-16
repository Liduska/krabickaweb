import Raven from 'raven-js';

export default function configure() {
  if (NODE_ENV === 'production') {
    Raven
    .config('https://f786d46ae057499599aad4700567fc8f@sentry.io/127272')
    .install()

    if (window.jQuery) {
      $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
        Raven.captureMessage(thrownError || jqXHR.statusText, {
            extra: {
                type: ajaxSettings.type,
                url: ajaxSettings.url,
                data: ajaxSettings.data,
                status: jqXHR.status,
                error: thrownError || jqXHR.statusText,
                response: jqXHR.responseText.substring(0, 100)
            }
        })
      })
    }
  }
}
