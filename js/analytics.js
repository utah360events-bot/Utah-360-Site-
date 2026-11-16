/* Utah 360 Events, Google tag.
   Paste the real IDs on the two assignments below. This file is the only
   place they are set. Every page loads it from the head.
   Placeholder values load nothing and make no network requests.
   See README.md, "Google tag and Ads conversions". */
window.U360_GTAG_ID = 'AW-10937757020';
window.U360_ADS_CONVERSION_LABEL = 'QlktCJ3EmbkdENzaw98o';

(function () {
  'use strict';

  var id = typeof window.U360_GTAG_ID === 'string' ? window.U360_GTAG_ID.trim() : '';
  var label = typeof window.U360_ADS_CONVERSION_LABEL === 'string' ? window.U360_ADS_CONVERSION_LABEL.trim() : '';

  function isPlaceholder(value) {
    if (!value) return true;
    if (value.indexOf('X') !== -1 || value.indexOf('x') !== -1) return true;
    return false;
  }

  var idLive = !isPlaceholder(id) && /^(G-[A-Z0-9]+|AW-\d+)$/.test(id);
  var labelLive = !isPlaceholder(label);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (idLive) {
    window.gtag = window.gtag || gtag;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
    gtag('js', new Date());
    gtag('config', id);
  }

  function conversionSendTo() {
    if (!labelLive) return '';
    if (label.indexOf('/') !== -1) return label;
    if (idLive && id.indexOf('AW-') === 0) return id + '/' + label;
    return '';
  }

  window.trackConversion = function (eventName, params) {
    var name = eventName || 'generate_lead';
    var data = params && typeof params === 'object' ? params : {};

    if (!idLive) {
      var entry = { event: name };
      Object.keys(data).forEach(function (key) {
        entry[key] = data[key];
      });
      window.dataLayer.push(entry);
      return;
    }

    if (name === 'generate_lead') {
      var sendTo = conversionSendTo();
      if (sendTo) {
        var conversion = { send_to: sendTo };
        Object.keys(data).forEach(function (key) {
          conversion[key] = data[key];
        });
        gtag('event', 'conversion', conversion);
      }
    }

    gtag('event', name, data);
  };

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest('a[href^="tel:"]');
    if (!link) return;
    var page = window.location && window.location.pathname ? window.location.pathname : 'phone';
    window.trackConversion('phone_call_click', {
      form: page,
      phone: link.getAttribute('href') || ''
    });
  });
})();
