import Raven from 'raven-js';

export default function configure() {
  if (NODE_ENV === 'production') {
    Raven
    .config('https://f786d46ae057499599aad4700567fc8f@sentry.io/127272')
    .install()
  }
}
