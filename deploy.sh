#!/bin/bash
set -e

echo "Loading env vars..."
export $(cat .env | sed 's/\r//' | grep -v '^#' | grep -v '^$' | xargs)

echo "Building image..."
docker build \
  --build-arg NEXT_PUBLIC_SALEOR_API_URL=$NEXT_PUBLIC_SALEOR_API_URL \
  --build-arg NEXT_PUBLIC_STOREFRONT_URL=$NEXT_PUBLIC_STOREFRONT_URL \
  --build-arg NEXT_PUBLIC_DEFAULT_CHANNEL=$NEXT_PUBLIC_DEFAULT_CHANNEL \
  -t asifshiraz/saleor-storefront:latest .

echo "Pushing to Docker Hub..."
docker push asifshiraz/saleor-storefront:latest

echo "Done. Go to Portainer and Pull and redeploy."
