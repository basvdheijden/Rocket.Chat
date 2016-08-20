Meteor.publish('livechat:FAQItems', function(roomId) {
  return RocketChat.models.FAQItems.find({
    rid: roomId
  }, {
    fields: {
      text: 1,
      url: 1
    }
  });
});
