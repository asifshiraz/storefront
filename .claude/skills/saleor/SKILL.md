---
name: saleor
description: Run admin GraphQL commands against the noderunner Saleor store (products, orders, customers, channels, discounts, shipping, settings). Use when the user asks to query or change anything in their live Saleor deployment.
---

# Saleor admin (noderunner store)

Run admin tasks against the live Saleor deployment via its GraphQL API.

## Connection facts

- **GraphQL API:** `https://api.noderunner.shop/graphql/` (this is the API — NOT the dashboard UI at `dashboard.noderunner.shop`)
- **Saleor Core version:** 3.23.x
- **Default channel slug:** `default-channel`
- **Auth:** App token (near-full admin: MANAGE_PRODUCTS/ORDERS/USERS/STAFF/CHANNELS/DISCOUNTS/SHIPPING/SETTINGS/TAXES/GIFT_CARD, IMPERSONATE_USER, etc.)
- **Token location:** `~/.config/noderunner/saleor_token` (mode 600, outside the repo — never commit or print it)

## How to run commands

Always use the helper script — it reads the token at call time and never echoes it:

```bash
scripts/saleor-gql '{ shop { name version } }'
scripts/saleor-gql -v '{"ch":"default-channel"}' 'query($ch:String!){ products(first:5, channel:$ch){ edges{ node{ id name } } } }'
scripts/saleor-gql -f path/to/query.graphql
```

The script exits non-zero if the response contains GraphQL `errors`, so you can chain on success.

Do NOT inline the token into curl commands written into the transcript. Let the script read it.

## Safety rules

- **Read freely.** Queries (lists, lookups, reports) need no confirmation.
- **Confirm before mutating.** For any mutation that creates, updates, or especially DELETES data (products, orders, customers, channels, refunds, staff), show the user the exact mutation + variables and get explicit confirmation before running it.
- **Refunds, deletions, and staff/permission changes are high-risk** — always confirm, and prefer the most narrowly-scoped operation.
- Most product/order queries require a `channel` argument — default to `default-channel` unless told otherwise.

## Common operations

- Products: `products`, `product`, `productCreate`, `productVariantBulkUpdate`, `productChannelListingUpdate` (pricing/visibility)
- Orders: `orders`, `order`, `orderFulfill`, `orderRefund`, `orderUpdate`
- Customers/staff: `customers`, `staffUsers`, `customerCreate`, `permissionGroupCreate`
- Catalog config: `channels`, `shippingZones`, `vouchers`, `giftCards`, `taxConfigurations`

Refer to the API reference at https://docs.saleor.io/api-reference/ for exact field/argument shapes.
