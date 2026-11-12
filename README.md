<div align="center">

# MerchMind Backend

**Express and MongoDB REST API for MerchMind, a multi-vendor custom printing and merch marketplace.**

[Frontend repo](https://github.com/farhadnazir/MerchMind-AI-Platform) · [Live frontend](https://merchmind.netlify.app) · [Case study](https://farhadnazir.com/projects/merchmind/)

<img src="https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs&logoColor=white" alt="Node.js 18">
<img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express 4">
<img src="https://img.shields.io/badge/MongoDB-Mongoose_7-47A248?logo=mongodb&logoColor=white" alt="MongoDB with Mongoose 7">
<img src="https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white" alt="Stripe">
<img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary">

</div>

![The MerchMind storefront, the React frontend that consumes this API](docs/screenshots/frontend-home.webp)

<p align="center"><sub>The <a href="https://github.com/farhadnazir/MerchMind-AI-Platform">MerchMind frontend</a>, which consumes this API.</sub></p>

> **Status:** final-year project. The API was deployed to Vercel and later Railway; neither deployment is online any more, so the live frontend runs without data. The code runs locally with your own MongoDB, SMTP, Stripe and Cloudinary settings.

## About

This service powers the MerchMind marketplace: customer and seller accounts, seller shops, products, timed events, coupons, orders and refunds, Stripe payments, buyer and seller conversations, and seller withdrawals. It is organised into one Express router per domain, Mongoose models and a central async error handler.

The AI design studio and product mockups run in the frontend, which calls the DeepAI and Dynamic Mockups APIs directly. See [MerchMind-AI-Platform](https://github.com/farhadnazir/MerchMind-AI-Platform).

## Features

- **Two account types:** customers and sellers sign up with an email activation link (Nodemailer), sign in with bcrypt-hashed passwords and receive a JWT in an HTTP cookie (`token` for customers, `seller_token` for sellers).
- **Admin role:** users with the `Admin` role can list and delete users and sellers and see all orders, products, events and withdrawal requests.
- **Shops and catalogue:** seller profiles, products with reviews, timed events and per-shop coupon codes. Images are uploaded to Cloudinary.
- **Orders:** order creation, status updates by the seller, refund requests and refund approval.
- **Payments:** Stripe payment intents created on the server (currency INR), and an endpoint that returns the Stripe publishable key so the frontend can load Stripe at runtime.
- **Messaging:** conversations and messages stored in MongoDB, with image attachments.
- **Withdrawals:** sellers save payout methods and request withdrawals; admins approve them.
- **Experimental generation route:** `POST /api/images/generate-image` forwards a prompt to RunwayML (Gen-3) through RapidAPI. The current frontend does not use it.

## Tech stack

| Area | Technology |
|---|---|
| Runtime | Node.js 18, Express 4 |
| Database | MongoDB with Mongoose 7 |
| Auth | jsonwebtoken, bcrypt / bcryptjs, cookie-parser |
| Email | Nodemailer |
| Media | Cloudinary |
| Payments | Stripe |
| Other | cors, dotenv, axios |

## API overview

All main routes are mounted under `/api/v2`. **Auth** shows the guard in the code: *user* (customer cookie), *seller* (seller cookie) or *admin* (user with the `Admin` role). Routes marked "-" have no guard.

<details>
<summary><b>User</b> <code>/api/v2/user</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-user` | - | Register and send an activation email |
| POST | `/activation` | - | Activate the account from the email token |
| POST | `/login-user` | - | Sign in |
| GET | `/getuser` | user | Current user |
| GET | `/logout` | - | Sign out |
| PUT | `/update-user-info` | user | Update profile |
| PUT | `/update-avatar` | user | Update avatar |
| PUT | `/update-user-addresses` | user | Add or update an address |
| DELETE | `/delete-user-address/:id` | user | Delete an address |
| PUT | `/update-user-password` | user | Change password |
| GET | `/user-info/:id` | - | Public user info |
| GET | `/admin-all-users` | admin | List all users |
| DELETE | `/delete-user/:id` | admin | Delete a user |

</details>

<details>
<summary><b>Shop</b> <code>/api/v2/shop</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-shop` | - | Register a shop and send an activation email |
| POST | `/activation` | - | Activate the shop |
| POST | `/login-shop` | - | Seller sign-in |
| GET | `/getSeller` | seller | Current seller |
| GET | `/logout` | - | Seller sign-out |
| GET | `/get-shop-info/:id` | - | Public shop info |
| PUT | `/update-shop-avatar` | seller | Update shop logo |
| PUT | `/update-seller-info` | seller | Update shop details |
| PUT | `/update-payment-methods` | seller | Save payout method |
| DELETE | `/delete-withdraw-method/` | seller | Remove payout method |
| GET | `/admin-all-sellers` | admin | List all sellers |
| DELETE | `/delete-seller/:id` | admin | Delete a seller |

</details>

<details>
<summary><b>Product</b> <code>/api/v2/product</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-product` | - | Create a product |
| GET | `/get-all-products-shop/:id` | - | Products of one shop |
| PUT | `/update/:id` | - | Update a product |
| DELETE | `/delete-shop-product/:id` | seller | Delete a product |
| GET | `/get-all-products` | - | All products |
| PUT | `/create-new-review` | user | Add a review |
| GET | `/admin-all-products` | admin | All products (admin) |

</details>

<details>
<summary><b>Event</b> <code>/api/v2/event</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-event` | - | Create a timed event |
| GET | `/get-all-events` | - | All events |
| GET | `/get-all-events/:id` | - | Events of one shop |
| DELETE | `/delete-shop-event/:id` | - | Delete an event |
| GET | `/admin-all-events` | admin | All events (admin) |

</details>

<details>
<summary><b>Coupon</b> <code>/api/v2/coupon</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-coupon-code` | seller | Create a coupon |
| GET | `/get-coupon/:id` | seller | Coupons of a shop |
| DELETE | `/delete-coupon/:id` | seller | Delete a coupon |
| GET | `/get-coupon-value/:name` | - | Look up a coupon by code |

</details>

<details>
<summary><b>Order</b> <code>/api/v2/order</code></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/create-order` | - | Create orders (split per shop) |
| GET | `/get-all-orders/:userId` | - | Orders of a customer |
| GET | `/get-seller-all-orders/:shopId` | - | Orders of a shop |
| PUT | `/update-order-status/:id` | seller | Update order status |
| PUT | `/order-refund/:id` | - | Request a refund |
| PUT | `/order-refund-success/:id` | seller | Approve a refund |
| GET | `/admin-all-orders` | admin | All orders (admin) |

</details>

<details>
<summary><b>Payment, conversation, message and withdraw</b></summary>

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/v2/payment/process` | - | Create a Stripe payment intent |
| GET | `/api/v2/payment/stripeapikey` | - | Return the Stripe publishable key |
| POST | `/api/v2/conversation/create-new-conversation` | - | Start a conversation |
| GET | `/api/v2/conversation/get-all-conversation-seller/:id` | seller | Seller conversations |
| GET | `/api/v2/conversation/get-all-conversation-user/:id` | user | Customer conversations |
| PUT | `/api/v2/conversation/update-last-message/:id` | - | Update the last message |
| POST | `/api/v2/message/create-new-message` | - | Send a message |
| GET | `/api/v2/message/get-all-messages/:id` | - | Messages in a conversation |
| POST | `/api/v2/withdraw/create-withdraw-request` | seller | Request a withdrawal |
| GET | `/api/v2/withdraw/get-all-withdraw-request` | admin | All withdrawal requests |
| PUT | `/api/v2/withdraw/update-withdraw-request/:id` | admin | Mark a withdrawal as processed |

</details>

Other routes: `GET /` returns a health message, `GET /test` returns "Hello world!", and `POST /api/images/generate-image` is the experimental RunwayML route described above.

## Getting started

### Prerequisites

- Node.js 18 and npm
- A MongoDB database, an SMTP account, and Stripe and Cloudinary accounts

### Install and run

```bash
git clone https://github.com/farhadnazir/merchmind-backend.git
cd merchmind-backend
npm install
npm start          # runs node server.js on the port set in PORT
```

### Environment variables

When `NODE_ENV` is not `PRODUCTION`, the app loads `config/.env`. In production, set the variables on the host instead. Use your own values; never commit real credentials.

| Variable | Purpose |
|---|---|
| `NODE_ENV` | Set to `PRODUCTION` on the server to skip loading `config/.env` |
| `PORT` | Port the server listens on |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET_KEY`, `JWT_EXPIRES` | Signing secret and lifetime for session tokens |
| `ACTIVATION_SECRET` | Secret for email activation tokens |
| `SMPT_SERVICE`, `SMPT_HOST`, `SMPT_PORT`, `SMPT_MAIL`, `SMPT_PASSWORD` | SMTP settings for activation emails (the code spells them `SMPT`) |
| `STRIPE_API_KEY` | Stripe publishable key, returned to the frontend |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment intents |
| `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary image uploads |
| `REACT_APP_API_URL` | Only used in the startup log message |

The experimental RunwayML route reads its RapidAPI key from `utils/imageGenerator.js`; use your own key there if you need that route.

### CORS

`app.js` only allows requests from `https://merchmind.netlify.app`, with credentials. Add your frontend origin (for example `http://localhost:3000`) to run the frontend locally against this API.

## Project structure

```text
app.js          Express app, CORS, routers and error handler
server.js       Database connection, Cloudinary config and server start
controller/     One router per domain (user, shop, product, event, coupon, order, payment, conversation, message, withdraw)
model/          Mongoose models
middleware/     Auth guards (isAuthenticated, isSeller, isAdmin), async and error handlers
routes/         Experimental image generation route
utils/          JWT cookie helpers, mailer, error class, RunwayML client
db/             MongoDB connection
```

## Credits

Built by **Farhad Nazir** and **Amish Naeem** as their final-year project. The marketplace API builds on an existing multi-vendor MERN e-shop codebase that was adapted for MerchMind.

## Links

- Frontend: https://github.com/farhadnazir/MerchMind-AI-Platform
- Live frontend: https://merchmind.netlify.app
- Case study: https://farhadnazir.com/projects/merchmind/

## Author

**Farhad Nazir**, full-stack software developer

- Website: [farhadnazir.com](https://farhadnazir.com)
- LinkedIn: [linkedin.com/in/farhadnazir](https://www.linkedin.com/in/farhadnazir)
- GitHub: [github.com/farhadnazir](https://github.com/farhadnazir)
- Email: [farhadnazirksa@gmail.com](mailto:farhadnazirksa@gmail.com)
