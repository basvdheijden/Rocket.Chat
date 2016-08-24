Meteor.publish('livechat:FAQItems', function(token) {
  return RocketChat.models.FAQItems.find({
    visitor: token
  }, {
    fields: {
      text: 1,
      url: 1,
      msgid: 1,
      visitor: 1
    },
    sort: {
      ts: 1
    }
  });
});
