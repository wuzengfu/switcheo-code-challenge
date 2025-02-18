package types

const (
	// ModuleName defines the module name
	ModuleName = "crud"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_crud"
)

var (
	ParamsKey = []byte("p_crud")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
