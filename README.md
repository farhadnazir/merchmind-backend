# ⚙️ MerchMind Backend

REST API for **[MerchMind AI](https://github.com/farhadnazir/MerchMind-AI-Platform)**, the AI-powered custom printing and merch marketplace.

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
</p>

## 📦 API Modules (`/api/v2/...`)

| Module | What it does |
|---|---|
| `user` | Sign-up with email activation, JWT login, profile and addresses |
| `shop` | Seller shops: create, activate, sign in, shop profile |
| `product` | Products with images (Cloudinary), reviews |
| `event` | Seller sales events |
| `coupon` | Discount codes per shop |
| `order` | Orders, status updates, refunds |
| `payment` | Stripe payment intents |
| `conversation` / `message` | Buyer–seller chat |
| `withdraw` | Seller earnings withdrawals |
| `/api/images/generate-image` | AI text-to-image design generation |

## 🚀 Run Locally

```bash
git clone https://github.com/farhadnazir/merchmind-backend.git
cd merchmind-backend
npm install
npm start
```

Configure the database, JWT, SMTP, Stripe and Cloudinary settings in `config/.env`.

## 👨‍💻 Developed By

**Farhad Nazir** & **Amish Naeem** • [github.com/farhadnazir](https://github.com/farhadnazir)
