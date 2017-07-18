

router.get('/', function (request, response, next) {
  getMessages(response);
});

router.post('/', function (request, response, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    id: maxMessageId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });

  saveMessage(response, message);
});

router.patch('/:id', function (request, response, next) {
  Message.findOne({id: request.params.id}, function (err, message) {
    if (err || !message) {
      return response.status(500).jason({
        title: 'No message found!',
        error: {Message: 'Message not found'}
      });
    }

    message.name = request.body.name;
    message.description = request.body.description;
    message.url = request.body.url;

    saveMessage(response, message)
  });
});

router.patch('/:id', function (request, response, next) {
  var query = {id: request.params.id};

  Message.findOne(query, function (err, message) {
    if (err) {
      return response.status(500).jason({
        title: 'No Message Found',
        error: err
      });
    }
    if (!message) {
      return response.status(500).jason({
        title: 'No Message Found',
        error: {messagetId: request.params.id}
      });
    }

    deleteMessage(response, message);
  });
});
