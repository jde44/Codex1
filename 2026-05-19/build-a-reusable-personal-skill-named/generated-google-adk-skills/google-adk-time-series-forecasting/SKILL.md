---
name: google-adk-time-series-forecasting
description: Use Google ADK time-series-forecasting sample patterns for forecasting workflows, BigQuery-style time series analysis, evaluation, and caveats.
---

# Google ADK Time Series Forecasting

Use this skill when Javon asks to build, adapt, or evaluate a forecasting agent for time series data using Google ADK sample patterns.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `java/agents/time-series-forecasting`
- License: Apache-2.0

Workflow:
1. Clarify the target variable, grain, horizon, historical window, seasonality, business events, and evaluation metric.
2. Inspect data quality, missing intervals, outliers, structural breaks, and leakage risks.
3. Build or describe forecasting workflow, baseline, model choice, confidence intervals, and backtesting.
4. Explain forecast drivers, limitations, uncertainty, and operational use cases.
5. When implementing, align to the Java ADK sample and any BigQuery or MCP toolbox assumptions.

Guardrails:
- Do not fabricate historical data, forecast accuracy, confidence intervals, or model outputs.
- Label forecasts as estimates, not certainties.
- Validate date ranges, train/test split, and business calendar assumptions.
