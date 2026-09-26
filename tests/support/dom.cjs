const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');

function assessment() {
  const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
  const script = fs.readFileSync(path.join(__dirname, '../../script.js'), 'utf8');
  const { document, window } = parseHTML(html);
  const values = new Map([['grc-consent', 'true']]);
  const localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value))
  };
  window.localStorage = localStorage;
  window.scrollTo = () => {};
  vm.runInNewContext(script, { window, document, localStorage, setTimeout, FileReader: class {}, Image: class {}, console });
  document.dispatchEvent(new window.Event('DOMContentLoaded'));

  const click = selector => document.querySelector(selector).dispatchEvent(new window.Event('click', { bubbles: true }));
  const note = (selector, text) => {
    const input = document.querySelector(selector);
    input.value = text;
    input.dispatchEvent(new window.Event('input', { bubbles: true }));
  };
  const framework = name => {
    const select = document.querySelector('#checklist-select');
    Object.defineProperty(select, 'value', { configurable: true, value: name });
    select.dispatchEvent(new window.Event('change', { bubbles: true }));
  };
  return { document, window, click, note, framework };
}

module.exports = { assessment };
