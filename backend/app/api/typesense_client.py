import typesense

TypesenseClient = typesense.Client({
    'nodes': [{
        'host': 'typesense',
        'port': '8108',
        'protocol': 'http',
    }],
    'api_key': 'typesense-api-key',
    'connection_timeout_seconds': 2
})