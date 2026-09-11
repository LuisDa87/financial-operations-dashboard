# Financial Operations Dashboard

A web application for managing invoices, payment transactions, customers, and financial platforms through a normalized PostgreSQL data model.

The project focuses on operational visibility, transaction tracking, reconciliation-oriented queries, bulk data ingestion, and API-driven CRUD workflows.

## Highlights

- CRUD workflows for customers, platforms, and invoices.
- Transaction views designed for operational analysis.
- PostgreSQL schema normalized to Third Normal Form (3NF).
- REST access through PostgREST.
- Reconciliation-oriented database views and filters.
- CSV import utility for repeatable data loading.
- Responsive JavaScript dashboard.
- Synthetic development dataset with no real customer information.

## Architecture

```mermaid
flowchart TD
    A[JavaScript Dashboard] --> B[PostgREST API]
    B --> C[PostgreSQL]
    D[CSV Import Utility] --> C
```

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | JavaScript, Bootstrap 5, Webpack |
| API | PostgREST |
| Database | PostgreSQL |
| Data ingestion | Node.js, CSV Parser, node-postgres |
| Tooling | Postman, DBeaver |

## Data model

The application works with four primary entities:

- **Customers:** account holder information.
- **Platforms:** payment channels such as digital wallets or banks.
- **Invoices:** amounts due, due dates, and payment status.
- **Transactions:** payment references linked to invoices and platforms.

Foreign keys and normalized tables reduce duplication and protect relational integrity.

## Operational queries

The API supports reporting use cases such as:

- Total payments grouped by customer.
- Pending and partially paid invoices with customer details.
- Transactions filtered by payment platform.
- Invoice and transaction data prepared for reconciliation workflows.

## Run the dashboard

```bash
git clone https://github.com/LuisDa87/financiera.git
cd financiera
npm install
npm start
```

The Webpack development server opens the dashboard at `http://localhost:8080`.

Configure the PostgREST base URL in `src/utils/getData.js` for your local environment.

## Import synthetic data

Set a local PostgreSQL connection string before running the importer:

```bash
export DATABASE_URL='postgresql://user:password@localhost:5432/financial_operations'
node importer.js
```

Use `.env.example` as a safe configuration reference. Never commit production credentials.

## Security notice

The CSV files in this repository contain synthetic demonstration data. Development credentials and infrastructure addresses must be supplied through environment variables and must not be committed to source control.

## Portfolio relevance

This project demonstrates database normalization, transaction tracking, operational reconciliation concepts, API consumption, bulk ingestion, and frontend integration—skills applicable to fintech and automation roles.

## Author

**Luis David Ducuara Cadavid**  
Backend & Automation Developer · Mechatronics Engineering Student  
[GitHub](https://github.com/LuisDa87) · [LinkedIn](https://www.linkedin.com/in/luisdavidd/)
