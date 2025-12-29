# Stripe Setup Instructions

## 1. Install Stripe Package

Run the following command to install the Stripe JavaScript SDK:

```bash
pnpm add @stripe/stripe-js
```

## 2. Environment Variables

Add the following environment variable to your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

You can find your publishable key in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).

## 3. Backend API Endpoint

You need to create a backend endpoint at `/stripe/create-checkout-session` that:

1. Accepts a POST request with `{ priceId: string }`
2. Creates a Stripe Checkout Session
3. Returns `{ sessionId: string }` or `{ id: string }`

Example implementation (Node.js/Express):

```javascript
app.post('/stripe/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/plans?success=true`,
    cancel_url: `${req.headers.origin}/plans?canceled=true`,
  });
  
  res.json({ sessionId: session.id });
});
```

## 4. Price IDs

The following Price IDs are configured:

- **Free Plan**: `price_1SjeYMRkir6oz0CXTxkaGd0a` ($0.00)
- **Basic Plan**: `price_1SjeZyRkir6oz0CX8JbgGzoa` ($19.90)
- **Pro Plan**: `price_1SjeahRkir6oz0CXVG0sJC0i` ($79.90)

These match the Price IDs from your Stripe CSV export.

