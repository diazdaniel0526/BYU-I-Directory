

router.get('/', function (request, response, next) {
  getDocuments(response);
});

router.post('/', function (request, response, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
    });

  saveDocument(response, document);
});

router.patch('/:id', function (request, response, next) {
  Document.findOne({id: request.params.id}, function (err, document) {
    if (err || !document) {
      return response.status(500).jason({
        title: 'No document found!',
        error: {Document: 'Document not found'}
      });
    }

    document.name = request.body.name;
    document.description = request.body.description;
    document.url = request.body.url;

    saveDocument(response, document)
  });
});

router.patch('/:id', function (request, response, next) {
  var query = {id: request.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return response.status(500).jason({
        title: 'No Document Found',
        error: err
      });
    }
    if (!document) {
      return response.status(500).jason({
        title: 'No Document Found',
        error: {documentId: request.params.id}
      });
    }

    deleteDocument(response, document);
  });
});
