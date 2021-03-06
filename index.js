/* kar-btt */

function escapeRegExp$1(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
const basicSymbolMap$1 = [
  { from: '1', to: '\u2801' },
  { from: '2', to: '\u2803' },
  { from: '3', to: '\u2809' },
  { from: '4', to: '\u2819' },
  { from: '5', to: '\u2811' },
  { from: '6', to: '\u280b' },
  { from: '7', to: '\u281b' },
  { from: '8', to: '\u2813' },
  { from: '9', to: '\u280a' },
  { from: '0', to: '\u281a' }
];
function addNumberPrefix(str) {
  return str.replace(
    new RegExp('\\d+', 'g'),
    '\u283c$&'
  );
}
function transpileNumber(str) {
  const numberPrefixAddedStr = addNumberPrefix(str);
  return basicSymbolMap$1.reduce((prevStr, curr) => {
    const from = curr.from;
    const to = curr.to;
    const replacedStr = prevStr.replace(
      new RegExp(escapeRegExp$1(from), "g"),
      to
    );
    return replacedStr;
  }, numberPrefixAddedStr);
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
const basicSymbolMap = [
  { from: '.', to: '\u2832' },
  { from: ',', to: '\u2802' },
  { from: ':', to: '\u2812' },
  { from: '\u002d', to: '\u2824' }, // - to ..
  { from: '\u2013', to: '\u2824' },
  { from: '!', to: '\u2816' },
  { from: '?', to: '\u2822' },
  { from: '«', to: '\u2813' },
  { from: '»', to: '\u281a' },
  { from: '(', to: '\u2836' },
  { from: ')', to: '\u2836' },
  { from: '[', to: '\u2820\u2836' },
  { from: ']', to: '\u2836\u2820' },
  { from: '„', to: '\u2820\u2826' },
  { from: '“', to: '\u2834\u2804' }
];
function transpileSymbol(str) {
  return basicSymbolMap.reduce((prevStr, curr) => {
    const from = curr.from;
    const to = curr.to;
    const replacedStr = prevStr.replace(
      new RegExp(escapeRegExp(from), "g"),
      to
    );
    return replacedStr;
  }, str);
}
const alphabetMap = [
  { from: ['\u0410', '\u0430'], to: '\u2801' },
  { from: ['\u04d8', '\u04d9'], to: '\u281c' },
  { from: ['\u0411', '\u0431'], to: '\u2803' },
  { from: ['\u0412', '\u0432'], to: '\u283a' },
  { from: ['\u0413', '\u0433'], to: '\u281b' },
  { from: ['\u0414', '\u0434'], to: '\u2819' },
  { from: ['\u0492', '\u0493'], to: '\u283b' },
  { from: ['\u0415', '\u0435'], to: '\u2811' },
  { from: ['\u0401', '\u0451'], to: '\u2821' },
  { from: ['\u0416', '\u0436'], to: '\u281a' },
  { from: ['\u0417', '\u0437'], to: '\u2835' },
  { from: ['\u0418', '\u0438'], to: '\u280a' },
  { from: ['\u0419', '\u0439'], to: '\u282f' },
  { from: ['\u041a', '\u043a'], to: '\u2805' },
  { from: ['\u049a', '\u049b'], to: '\u283d' },
  { from: ['\u041b', '\u043b'], to: '\u2807' },
  { from: ['\u041c', '\u043c'], to: '\u280d' },
  { from: ['\u041d', '\u043d'], to: '\u281d' },
  { from: ['\u04a2', '\u04a3'], to: '\u2829' },
  { from: ['\u041e', '\u043e'], to: '\u2815' },
  { from: ['\u04e8', '\u04e9'], to: '\u2823' },
  { from: ['\u041f', '\u043f'], to: '\u280f' },
  { from: ['\u0420', '\u0440'], to: '\u2817' },
  { from: ['\u0421', '\u0441'], to: '\u280e' },
  { from: ['\u0422', '\u0442'], to: '\u281e' },
  { from: ['\u04ae', '\u04af'], to: '\u280c' },
  { from: ['\u0423', '\u0443'], to: '\u2825' },
  { from: ['\u040e', '\u045e'], to: '\u2827' },
  { from: ['\u0424', '\u0444'], to: '\u280b' },
  { from: ['\u0425', '\u0445'], to: '\u2813' },
  { from: ['\u04b2', '\u04b3'], to: '\u2839' },
  { from: ['\u0426', '\u0446'], to: '\u2809' },
  { from: ['\u0427', '\u0447'], to: '\u281f' },
  { from: ['\u0428', '\u0448'], to: '\u2831' },
  { from: ['\u0429', '\u0449'], to: '\u282d' },
  { from: ['\u042a', '\u044a'], to: '\u2837' },
  { from: ['\u042b', '\u044b'], to: '\u282e' },
  { from: ['\u042c', '\u044c'], to: '\u283e' },
  { from: ['\u042d', '\u044d'], to: '\u282a' },
  { from: ['\u042e', '\u044e'], to: '\u2833' },
  { from: ['\u042f', '\u044f'], to: '\u282b' }
];
function transpileAlphabet(str, noUppercasePrefix = false) {
  return alphabetMap.reduce((prevStr, curr) => {
    const fromUpper = curr.from[0];
    const fromLower = curr.from[1];
    const to = curr.to;
    const upperReplacedStr = prevStr.replace(
      new RegExp(fromUpper, "g"),
      (noUppercasePrefix ? '' : '\u2828') + to
    );
    const upperAndLowerReplacedStr = upperReplacedStr.replace(
      new RegExp(fromLower, "g"),
      to
    );
    return upperAndLowerReplacedStr;
  }, str);
}
function transpile(str, noUppercasePrefix) {
  return transpileAlphabet(transpileNumber(transpileSymbol(str)), noUppercasePrefix);
}
window.onload = () => {
  const UI = {
    beforeTextarea: document.getElementById('before'),
    afterTextarea: document.getElementById('after')
  };
  UI.beforeTextarea.addEventListener('input', function (e) {
    console.log(UI);
    UI.afterTextarea.value = transpile(UI.beforeTextarea.value, true);
  });
};
