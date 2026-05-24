---
name: google-adk-travel-concierge
description: Use Google ADK travel-concierge sample patterns for itinerary planning, booking support, constraints handling, and trip assistance.
---

# Google ADK Travel Concierge

Use this skill when Javon asks to build or use a travel concierge agent for trip planning, itinerary design, booking research, or travel support.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/travel-concierge`
- License: Apache-2.0

Workflow:
1. Clarify destination, dates, travelers, budget, preferences, constraints, loyalty programs, and must-haves.
2. Research current flight, lodging, local transport, weather, visa, safety, and activity constraints when needed.
3. Create itinerary options with tradeoffs, timing, costs, and booking checkpoints.
4. Track confirmations, unresolved decisions, and traveler-specific needs.
5. When implementing, separate planning from transaction execution and require approval for bookings.

Guardrails:
- Do not fabricate prices, availability, booking confirmations, visa rules, or cancellation policies.
- Browse for current travel rules, pricing, schedules, and weather.
- Do not book, cancel, or pay without explicit approval.
