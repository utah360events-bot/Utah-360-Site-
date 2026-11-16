# Utah 360 Events, Website

Marketing site for utah360events.com (360° video booth + digital photo booth rentals, Utah County, Salt Lake County, and Park City).

Hosted on Netlify. This repo is the source of truth for site files.

## Google tag and Ads conversions

Paste the real IDs in `js/analytics.js`. That file is the only place they are set. Every HTML page loads it from `<head>`.

1. Google tag ID, or Google Ads conversion ID. Replace the placeholder on this line:

   `window.U360_GTAG_ID = 'G-XXXXXXX';`

   Use a GA4 measurement ID (`G-` plus the ID) or a Google Ads ID (`AW-` plus the conversion ID). Examples: `window.U360_GTAG_ID = 'G-PSW1MY7HB4';` or `window.U360_GTAG_ID = 'AW-1234567890';`.

2. Google Ads conversion label. Replace the placeholder on the next line:

   `window.U360_ADS_CONVERSION_LABEL = 'XXXXXXXX';`

   In Google Ads, open the conversion and copy `send_to`. It looks like `AW-1234567890/AbCdEfGhIjKlMnOpQr`. Paste the label after the slash (`AbCdEfGhIjKlMnOpQr`). You can also paste the full `AW-1234567890/AbCdEfGhIjKlMnOpQr` string.

While `U360_GTAG_ID` is still a placeholder (`G-XXXXXXX`, `AW-XXXXXXX`, or any value that contains X), the site does not load `gtag.js` and does not contact Google. `trackConversion` only pushes the event onto `window.dataLayer`. After a real ID is saved, `/thank-you` sends `generate_lead` on load. If the conversion label is also real, that same call sends an Ads conversion with `send_to`. Clicks on `tel:` links send `phone_call_click` through the same path.

A successful inquiry or quote form redirects to `/thank-you`. Failed submits stay on the page and show the inline error.
