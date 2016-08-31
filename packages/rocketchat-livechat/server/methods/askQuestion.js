Meteor.methods({
  'askQuestion'(message, token) {
    var keywords = RocketChat.models.FAQItems.keywords(message);
    var items = RocketChat.models.FAQItems.query(keywords);

    RocketChat.models.FAQItems.remove({visitor: token});

    if (items) {
      RocketChat.models.FAQItems.set(items, token);
    }

    return true;
  }
});
