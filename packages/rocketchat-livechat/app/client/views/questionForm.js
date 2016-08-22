let sendMessage = function(event, instance) {
  let message = instance.find('.input-message').value;
  Meteor.call('askQuestion', message, visitor.getToken());
};

Template.questionForm.events({
  'click .send-button': sendMessage,

  'keydown .input-message': function(event, instance) {
    if (event.which === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      sendMessage(event, instance);
    }
  }
});
