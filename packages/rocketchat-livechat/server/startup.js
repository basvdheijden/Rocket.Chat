Meteor.startup(() => {
  RocketChat.roomTypes.setPublish('l', (code) => {
    return RocketChat.models.Rooms.findLivechatByCode(code, {
      name: 1,
      t: 1,
      cl: 1,
      u: 1,
      label: 1,
      usernames: 1,
      v: 1,
      livechatData: 1,
      topic: 1,
      tags: 1,
      sms: 1,
      code: 1,
      open: 1
    });
  });

  RocketChat.authz.addRoomAccessValidator(function (room, user) {
    return room.t === 'l' && RocketChat.authz.hasPermission(user._id, 'view-livechat-rooms');
  });

  RocketChat.callbacks.add('beforeLeaveRoom', function (user, room) {
    if (room.t !== 'l') {
      return user;
    }
    throw new Meteor.Error(TAPi18n.__('You_cant_leave_a_livechat_room_Please_use_the_close_button', {
      lng: user.language || RocketChat.settings.get('language') || 'en'
    }));
  }, RocketChat.callbacks.priority.LOW);

  RocketChat.callbacks.add('afterSaveMessage', function (message, room) {
    // If this is not a livechat
    // Or if the user is an agent, bail out.
    if (room.t !== 'l' || RocketChat.models.Users.isUserInRole(message.u._id, 'livechat-agent')) {
      return message;
    }

    if (room && room.v && room.v.token) {
      var keywords = RocketChat.models.FAQItems.keywords(message.msg);
      var items = RocketChat.models.FAQItems.query(keywords);

      if (items) {
        RocketChat.models.FAQItems.remove({visitor: room.v.token, msgid: {'$ne': null}});
        RocketChat.models.FAQItems.set(items, room.v.token, message, room);
      }
    }

    return message;
  }, RocketChat.callbacks.priority.HIGH, 'getFAQItems');
});
