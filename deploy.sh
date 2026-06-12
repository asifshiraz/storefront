#!/bin/bash
set -e

cd /mnt/d/Noderunner/storefront

echo "Loading env vars..."
export $(cat .env | sed 's/\r//' | grep -v '^#' | grep -v '^$' | xargs)

echo "Building image..."
podman build \
  --build-arg NEXT_PUBLIC_SALEOR_API_URL=$NEXT_PUBLIC_SALEOR_API_URL \
  --build-arg NEXT_PUBLIC_STOREFRONT_URL=$NEXT_PUBLIC_STOREFRONT_URL \
  --build-arg NEXT_PUBLIC_DEFAULT_CHANNEL=$NEXT_PUBLIC_DEFAULT_CHANNEL \
  --build-arg NEXT_PUBLIC_SALEOR_MEDIA_PROXY=true \
  -t asifshiraz/saleor-storefront:latest .

echo "Pushing to Docker Hub..."
podman push localhost/asifshiraz/saleor-storefront:latest docker.io/asifshiraz/saleor-storefront:latest

echo "Done. Go to Portainer and Pull and redeploy."
