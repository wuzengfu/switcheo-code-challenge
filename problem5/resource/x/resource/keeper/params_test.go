package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "resource/testutil/keeper"
	"resource/x/resource/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.ResourceKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
