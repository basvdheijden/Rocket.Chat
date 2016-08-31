let retext = Npm.require('retext');
let nlcstToString = Npm.require('nlcst-to-string');
let keywords = Npm.require('retext-keywords');
let dutch = Npm.require('retext-dutch');

const personalPronouns = ['ik', 'u', 'jij', 'hij', 'zij', 'wij', 'we', 'jullie'];
const possessiveDeterminer = ['mijn', 'uw', 'jouw', 'zijn', 'haar', 'onze', 'hun'];
const interrogativeWord = ['welk', 'welke', 'wie', 'wiens', 'wier', 'wat', 'hoe', 'wanneer', 'waarom'];
const commonVerbs = [
  'ben', 'bent', 'is', 'zijn',
  'heb', 'hebt', 'heeft', 'hebben',
  'kan', 'kun', 'kunt', 'kunnen',
  'mag', 'mogen',
  'moet', 'moeten',
  'vind', 'vindt', 'vinden',
  'wil', 'wilt', 'willen'
];
const articles = ['de', 'het', 'een'];

RocketChat.Keywords = {
  getKeywords: (sentence) => {
    const words = [];

    retext().use(dutch).use(keywords).process(sentence, (err, file) => {
      if (err) {
        console.err(err);
      }

      file.namespace('retext').keywords.forEach((keyword) => {
        const word = nlcstToString(keyword.matches[0].node).toLowerCase();
        let ignore = false;

        [personalPronouns, possessiveDeterminer, interrogativeWord, commonVerbs, articles].forEach(function (list) {
          if (list.indexOf(word) != -1) {
            ignore = true;
          }
        });

        if (!ignore) {
          words.push(word);
        }
      });
    });

    return words;
  }
};
