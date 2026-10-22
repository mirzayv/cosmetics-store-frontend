# Cosmetics Store — Frontend

React storefront for an online cosmetics store. Customers browse skincare, makeup, haircare and fragrance products, add them to a basket, place orders and track them.
It talks to the [Express + MongoDB backend](https://github.com/mirzayv/cosmetics-store-backend) over a REST API.

## Tech stack

- **Core:** React 18, TypeScript, Create React App
- **State:** Redux Toolkit with memoized selectors (`reselect`)
- **UI:** MUI, Swiper sliders, SweetAlert2 notifications
- **Routing:** React Router v5
- **HTTP:** Axios with cookie-based authentication

## Features

- **Home page:** best sellers, new arrivals, active members and a promotions slider
- **Products:** category filter, search, sorting (newest, price, views) and paging
- **Product page:** image gallery, details, view counter and store contact info
- **Basket:** add, remove and change quantity; saved in `localStorage` so it survives a reload
- **Orders:** paused, processing and finished tabs; pay for or cancel a paused order, confirm delivery of a processing one
- **Account:** sign up, log in, edit profile and avatar
- **Help and About pages:** FAQ, terms and a contact form

## Project structure

```
src/
├── app/
│   ├── components/   # Navbar, footer, auth modal, basket
│   ├── screens/      # homePage, productsPage, ordersPage, usersPage, helpPage, aboutPage
│   │                 # each screen keeps its own Redux slice and selectors
│   ├── services/     # API calls (MemberService, ProductService, OrderService, MessageService)
│   ├── hooks/        # useBasket, useGlobals
│   ├── context/      # Global auth state
│   └── store.ts      # Redux store
├── lib/              # Enums, types, config, static data
└── css/              # Page styles
```

## Getting started

**Requirements:** Node.js 18+, Yarn, and the backend running locally.

```bash
git clone https://github.com/mirzayv/cosmetics-store-frontend.git
cd cosmetics-store-frontend
yarn install
```

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:3003
```

Start the dev server:

```bash
yarn start
```

The app opens at `http://localhost:3000`.

## Credits

Banner and promotion photos are from [Unsplash](https://unsplash.com) (Ibnu Ihza, PMV Chamara, Jocelyn Morales, Wagiman Dobooz).

## Related

- Backend: [cosmetics-store-backend](https://github.com/mirzayv/cosmetics-store-backend)
