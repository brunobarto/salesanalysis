# Sales Performance Analysis — Multimedia Shop

An end-to-end data analysis project: raw retail orders → cleaned dataset → EDA → business recommendations,
shown on an interactive bilingual (EN/FR) web page.

**Live demo:** https://<your-username>.github.io/sales-performance-analysis/

## Business question
Where does the shop make money, where does it lose it, and what should it change?

## Dataset
Sample Superstore (Kaggle): 9,994 order lines, 2014–2017, US regions, 3 categories
(Technology, Furniture, Office Supplies).

## Method
| Step | What | Why |
|------|------|-----|
| Cleaning | Missing values, duplicates, date types | Reliable aggregates |
| Feature selection | 9 business columns + Margin | Remove noise (IDs, names) |
| EDA | Distributions, descriptive stats | Understand the data's shape |
| Analysis | Monthly, region, category, discount | Answer each business question |

## Key insights
1. Discounts above 20 % make orders unprofitable → cap at 20 %.
2. Technology = top revenue and top margin.
3. Furniture sells a lot but barely makes a profit (tables, bookcases).
4. Strong Q4 seasonality (Sep, Nov, Dec).

## Tech
Python · Pandas · NumPy · Matplotlib · Jupyter — Web: HTML · CSS · vanilla JS · Chart.js

## Run it
```bash
pip install -r requirements.txt
# put the Kaggle CSV in data/superstore.csv
cd notebook && jupyter notebook sales_analysis.ipynb   # run all → writes data/data.json + figures/
cd .. && python -m http.server 8000                     # open [localhost](http://localhost:8000)
