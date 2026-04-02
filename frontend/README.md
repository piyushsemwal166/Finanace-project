# Frontend App

## Run

1. Copy `.env.example` to `.env`
2. Install dependencies
3. Run `npm run dev`

## Notes

- Dashboard is role-aware through the backend JWT role claims.
- Admin users can manage records and users.
- Analyst users can read records and analytics.
- Viewer users can access the dashboard only.