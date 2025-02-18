package resource_test

import (
	"testing"

	keepertest "resource/testutil/keeper"
	"resource/testutil/nullify"
	resource "resource/x/resource/module"
	"resource/x/resource/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ResourceKeeper(t)
	resource.InitGenesis(ctx, k, genesisState)
	got := resource.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
