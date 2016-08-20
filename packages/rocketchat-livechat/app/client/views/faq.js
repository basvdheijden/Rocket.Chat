Template.faq.helpers({
  faqItems() {
    return FAQItems.find();
  }
});

Template.faq.onCreated(function() {
  Meteor.call('livechat:getInitialData', visitor.getToken(), (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result.room) {
        this.subscribe('livechat:FAQItems', result.room._id);
      }
    }
  });
});
