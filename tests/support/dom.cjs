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
  const select = document.querySelector('#checklist-select');
  Object.defineProperty(select, 'options', { configurable: true, value: Array.from(select.querySelectorAll('option')) });
  Object.defineProperty(select, 'selectedIndex', { configurable: true, get: () => select.value === 'iso_27001' ? 1 : 0 });
  let exportExcelHandler;
  let exportPdfHandler;
  const excelButton = document.querySelector('#export-excel');
  const pdfButton = document.querySelector('#export-pdf');
  const addPdfListener = pdfButton.addEventListener.bind(pdfButton);
  pdfButton.addEventListener = (type, handler) => {
    if (type === 'click') exportPdfHandler = handler;
    addPdfListener(type, handler);
  };
  const addExcelListener = excelButton.addEventListener.bind(excelButton);
  excelButton.addEventListener = (type, handler) => {
    if (type === 'click') exportExcelHandler = handler;
    addExcelListener(type, handler);
  };
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
  return { document, window, click, note, framework, exportExcel: () => exportExcelHandler(), exportPdf: () => exportPdfHandler() };
}

module.exports = { assessment };
