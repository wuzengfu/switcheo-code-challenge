# resource
**resource** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

### Create a resource
```
resourced tx resource create-resource hello world --from alice --chain-id resource
```

### View a resource by ID
```
resourced q resource show-resource 0
```

### List all resources
```
resourced q resource list-resource
```

### List all resources whose name contains a keyword
```
resourced q resource list-resource-by-name "hello"
```

### Update a resource by ID
```
resourced tx resource update-resource "New resource name" "new resource details" 0 --from alice --chain-id resource
```

### Delete a resource by ID
```
resourced tx resource delete-resource 0 --from alice --chain-id resource
```
