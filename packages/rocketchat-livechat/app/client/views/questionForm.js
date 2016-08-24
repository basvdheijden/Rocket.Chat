let sendMessage = function(event, instance) {
  let message = instance.find('.input-message');
  Meteor.call('askQuestion', message.value, visitor.getToken());
  $(message).val('').focus();
  Session.set('questionAsked', true);
};

Template.questionForm.events({
  'click .send-button': sendMessage,

  'keydown .input-message': function(event, instance) {
    if (event.which === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      sendMessage(event, instance);
    }
  }
});
