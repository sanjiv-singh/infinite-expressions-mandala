import React from 'react';
import { ShopifyProvider as BaseShopifyProvider } from '@shopify/buy-react';

// --- IMPORTANT ---
// Replace these values with the credentials you got from your Shopify Admin in Part 1.
const shopifyConfig = {
  storeDomain: 'YOUR_STORE_DOMAIN.myshopify.com', // e.g., my-mandala-store.myshopify.com
  storefrontToken: 'YOUR_PUBLIC_ACCESS_TOKEN', // e.g., shpat_xxxxxxxx...
  storefrontApiVersion: '2024-04',
};

export const ShopifyProvider = ({ children }: { children: React.ReactNode }) => {
  if (
    shopifyConfig.storeDomain === 'YOUR_STORE_DOMAIN.myshopify.com' ||
    shopifyConfig.storefrontToken === 'YOUR_PUBLIC_ACCESS_TOKEN'
  ) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>
        <h2>Configuration Needed</h2>
        <p>Please update the <strong>shopifyConfig</strong> details in <code>context/ShopifyProvider.tsx</code> to connect to your Shopify store.</p>
      </div>
    );
  }

  return (
    <BaseShopifyProvider
      storeDomain={shopifyConfig.storeDomain}
      storefrontToken={shopifyConfig.storefrontToken}
      storefrontApiVersion={shopifyConfig.storefrontApiVersion}
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      {children}
    </BaseShopifyProvider>
  );
};
