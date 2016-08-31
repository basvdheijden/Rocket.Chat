/**
 * Livechat FAQ Items model
 */
class FAQItems extends RocketChat.models._Base {
  constructor() {
    super();
    this._initModel('livechat_faq_items');
  }

  query(keywords) {
    return RocketChat.Solr.getResults(keywords);
  }

  keywords(message) {
    return RocketChat.Keywords.getKeywords(message);
  }

  set(items, token, message, room) {
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
