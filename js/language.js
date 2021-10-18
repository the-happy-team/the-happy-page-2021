const LS = window.localStorage;

if (window.location.href.includes('/en')) {
  LS.setItem('tha-lang', 'en');
} else if (window.location.href.includes('/pt')) {
  LS.setItem('tha-lang', 'pt');
} else {
  LS.setItem('tha-lang', (LS.getItem('tha-lang') || 'en'));
  window.location.href = `./${LS.getItem('tha-lang')}`;
}
