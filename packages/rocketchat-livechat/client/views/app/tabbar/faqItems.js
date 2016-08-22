Template.faqItems.helpers({
  faqItems() {
    return FAQItems.find();
  }
});

Template.faqItems.onCreated(function() {
  this.visitorToken = new ReactiveVar(null);
  this.user = new ReactiveVar();

  var currentData = Template.currentData();

  if (currentData && currentData.rid) {
    this.autorun(() => {
      let room = ChatRoom.findOne(currentData.rid);

      if (room && room.v && room.v.token) {
        this.visitorToken.set(room.v.token);
      } else {
        this.visitorToken.set();
      }
    });

    this.subscribe('livechat:visitorInfo', { rid: currentData.rid });
  }

  this.autorun(() => {
    this.subscribe('livechat:FAQItems', this.visitorToken.get());
  });
});
