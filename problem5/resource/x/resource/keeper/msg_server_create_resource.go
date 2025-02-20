package keeper

import (
	"context"

	"resource/x/resource/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateResource(goCtx context.Context, msg *types.MsgCreateResource) (*types.MsgCreateResourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var resource = types.Resource{
		Creator: msg.Creator,
		Name:    msg.Name,
		Details: msg.Details,
	}
	id := k.AppendResource(
		ctx,
		resource,
	)
	return &types.MsgCreateResourceResponse{
		Id: id,
	}, nil
}
