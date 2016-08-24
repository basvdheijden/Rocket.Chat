Meteor.methods({
  'askQuestion'(message, token) {
    var keywords = RocketChat.models.FAQItems.keywords(message);
    var items = RocketChat.models.FAQItems.query(keywords);

    if (items) {
      RocketChat.models.FAQItems.remove({visitor: token});
      RocketChat.models.FAQItems.set(items, token);
    }

    return true;
  }
});
