# ── base: shared system + runtime deps ─────────────────────────────────────
FROM python:3.11-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── runtime: production image ───────────────────────────────────────────────
FROM base AS runtime
COPY fifa_ch/ ./fifa_ch/
EXPOSE 8000
CMD ["uvicorn", "fifa_ch.main:app", "--host", "0.0.0.0", "--port", "8000"]

# ── test: adds dev deps + full source ──────────────────────────────────────
FROM base AS test
COPY requirements-dev.txt .
RUN pip install --no-cache-dir -r requirements-dev.txt
COPY . .
CMD ["pytest", "-v", "--tb=short"]
