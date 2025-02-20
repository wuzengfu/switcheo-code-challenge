package keeper

import (
	"context"
	"cosmossdk.io/store/prefix"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/types/query"

	"resource/x/resource/types"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"strings"
)

func (k Keeper) ListResourceByName(goCtx context.Context, req *types.QueryListResourceByNameRequest) (*types.QueryListResourceByNameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	storeAdapter := runtime.KVStoreAdapter(k.storeService.OpenKVStore(goCtx))
	store := prefix.NewStore(storeAdapter, types.KeyPrefix(types.ResourceKey))

	var resources []types.Resource
	pageRes, err := query.Paginate(store, req.Pagination, func(key []byte, value []byte) error {
		var resource types.Resource
		if err := k.cdc.Unmarshal(value, &resource); err != nil {
			return err
		}

		if strings.Contains(strings.ToLower(resource.Name), strings.ToLower(req.Name)) {
			resources = append(resources, resource)
		}

		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryListResourceByNameResponse{Resource: resources, Pagination: pageRes}, nil
}
