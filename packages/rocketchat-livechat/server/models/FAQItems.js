/**
 * Livechat FAQ Items model
 */
class FAQItems extends RocketChat.models._Base {
  constructor() {
    super();
    this._initModel('livechat_faq_items');
  }

  query(keywords) {
    return [
      { url: 'http://kip2.nl/', text: keywords[0] + ' 1 (' + new Date() + ' )' },
      { url: 'http://kip.2nl/', text: keywords[0] + ' 2 (' + new Date() + ' )' },
      { url: 'http://kip2.l/', text: keywords[0] + '  3 (' + new Date() + ' )' }
    ];
  }

  keywords(message) {
    return [message, 'kip', 'ei', new Date()];
  }

  set(items, token, message, room) {
    if (!items.length) return;

    super.remove({'visitor': token});

    items.forEach(function(item) {
      var faqItem = {
        text: item.text,
        url: item.url,
        rid: room ? room._id : null,
        ts: new Date(),
        u: message ? message.u : {},
        msgid: message ? message._id : null,
        visitor: token
      };

      super.insert(faqItem);
    });
  }
}

RocketChat.models.FAQItems = new FAQItems();
