package types

const (
	// ModuleName defines the module name
	ModuleName = "resource"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_resource"
)

var (
	ParamsKey = []byte("p_resource")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
