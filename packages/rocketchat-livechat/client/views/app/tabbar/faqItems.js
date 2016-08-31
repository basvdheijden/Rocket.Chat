Template.faqItems.helpers({
  faqItems() {
    const token = Template.instance().visitorToken.get();

    return FAQItems.find({
      visitor: token
    }).map(function(item) {
      var message = ChatMessage.findOne({
        _id: item.msgid
      }, {
        fields: { msg: 1 }
      });

      if (message) {
        item.truncated = false;

        if (message.msg.length > 20) {
          message.msg = message.msg.substr(0, 20) + '...';
          item.truncated = true;
        }

        item.message = message.msg;
      }

      return item;
    });
  }
});

Template.faqItems.onCreated(function() {
  this.visitorToken = new ReactiveVar(null);
  this.user = new ReactiveVar();

  let currentData = Template.currentData();
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

  this.subscribe('livechat:FAQItems', this.visitorToken.get());
});
