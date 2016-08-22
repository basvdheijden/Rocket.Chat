Template.faq.helpers({
  faqItems() {
    return FAQItems.find({
      msgid: null
    });
  }
});

Template.faq.onCreated(function() {
  this.subscribe('livechat:FAQItems', visitor.getToken());
});
