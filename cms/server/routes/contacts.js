

router.get('/', function (request, response, next) {
  getContacts(response);
});

router.post('/', function (request, response, next) {
  var maxContactsId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactsId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });

  saveContact(response, contact);
});

router.patch('/:id', function (request, response, next) {
  Contact.findOne({id: request.params.id}, function (err, contact) {
    if (err || !contact) {
      return response.status(500).jason({
        title: 'No contact found!',
        error: {Contact: 'Contact not found'}
      });
    }

    contact.name = request.body.name;
    contact.description = request.body.description;
    contact.url = request.body.url;

    saveContact(response, contact)
  });
});

router.patch('/:id', function (request, response, next) {
  var query = {id: request.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return response.status(500).jason({
        title: 'No Contact Found',
        error: err
      });
    }
    if (!contact) {
      return response.status(500).jason({
        title: 'No Contact Found',
        error: {contactId: request.params.id}
      });
    }

    deleteContact(response, contact);
  });
});

var getContacts = function (response) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return response.status(500).json({
          title: 'An Error occurred',
          error: err
        });
      }
      response.status(200).json({
        contact: success,
        obj: contacts
      });
    })
};

var saveContacts = function (response, contact) {
  if (contact.group && contact.group.length > 0) {
    //for (let groupContact of contact.group) {
      groupContact = groupContact._id;
  }

  contact.save(function (err, responseult) {
    response.setHeader('Content-Type', 'application/json');
    if (err) {
      return response.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    getContacts(response);
  })
}
