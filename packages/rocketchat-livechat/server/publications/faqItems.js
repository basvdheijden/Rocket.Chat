Meteor.publish('livechat:FAQItems', function(token) {
  return RocketChat.models.FAQItems.find({
    visitor: token
  }, {
    fields: {
      text: 1,
      url: 1
    }
  });
});
