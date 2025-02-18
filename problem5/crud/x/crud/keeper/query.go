package keeper

import (
	"crud/x/crud/types"
)

var _ types.QueryServer = Keeper{}
