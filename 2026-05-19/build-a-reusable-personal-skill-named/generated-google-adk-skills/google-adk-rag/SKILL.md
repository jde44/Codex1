---
name: google-adk-rag
description: Use Google ADK RAG sample patterns to build retrieval-augmented generation workflows with grounded answers, citations, and corpus controls.
---

# Google ADK RAG

Use this skill when Javon asks to build, test, or adapt a retrieval-augmented generation agent using Google ADK sample patterns.

Source basis:
- Upstream: https://github.com/google/adk-samples
- Sample path: `python/agents/RAG`
- License: Apache-2.0

Workflow:
1. Define the corpus, user questions, retrieval scope, freshness needs, and answer format.
2. Plan ingestion, chunking, metadata, embedding, retrieval, reranking, and citation strategy.
3. Answer only from retrieved evidence unless clearly labeled as general reasoning.
4. Return citations, source snippets, confidence, missing evidence, and suggested corpus improvements.
5. When implementing, include evaluation prompts for groundedness, recall, precision, and hallucination checks.

Guardrails:
- Do not invent citations, facts, source titles, document contents, or retrieval results.
- Flag stale, conflicting, or insufficient evidence.
- Protect confidential and regulated documents through access controls and redaction.
