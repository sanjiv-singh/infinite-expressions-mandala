import React from 'react';
import { ShopifyProvider as BaseShopifyProvider } from '@shopify/buy-react';

// --- IMPORTANT ---
// To connect your Shopify store, replace the placeholder values below
// with the credentials from your Shopify Admin's "Headless" sales channel.
const shopifyConfig = {
  // 1. Replace this with your unique .myshopify.com domain
  storeDomain: 'infinite-expressions-mandala-art-store-2.myshopify.com',
  // 2. Replace this with your public Storefront API access token
  storefrontToken: '57e0e490148efeac3b4c49a190b17bd4',
  storefrontApiVersion: '2024-04', // You can generally leave this as is
};

export const ShopifyProvider = ({ children }: { children: React.ReactNode }) => {
  // This check ensures you've replaced the placeholder values.
  if (
    !shopifyConfig.storeDomain ||
    !shopifyConfig.storefrontToken ||
    shopifyConfig.storeDomain.includes('YOUR_STORE_DOMAIN') ||
    shopifyConfig.storefrontToken.includes('YOUR_PUBLIC_STOREFRONT_ACCESS_TOKEN')
  ) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: '#F5F5F5', backgroundColor: '#1A1A1A', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#FFC300' }}>Configuration Required</h2>
        <p style={{ marginTop: '1rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Please open the file <code>context/ShopifyProvider.tsx</code> and replace the placeholder credentials with your own Shopify Store Domain and Storefront Access Token to connect your store.
        </p>
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
