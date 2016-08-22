Meteor.publish('livechat:FAQItems', function(roomId) {
  if (!this.userId) {
    return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:FAQItems' }));
  }

  return RocketChat.models.FAQItems.find({
    "u._id": this.userId
  }, {
    fields: {
      text: 1,
      url: 1
    }
  });
});
