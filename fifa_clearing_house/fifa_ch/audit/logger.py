"""
Audit Logger – writes NDJSON records to a local file.

Every deterministic engine call produces one record containing:
  request_id, route_decision, component, control_objective,
  timestamp, input_hash, output_hash
"""
from __future__ import annotations

import hashlib
import json
import os
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

_LOCK = threading.Lock()
_LOG_PATH = Path(os.environ.get("AUDIT_LOG_PATH", "audit_log.ndjson"))


def _sha256(obj: Any) -> str:
    serialised = json.dumps(obj, sort_keys=True, default=str)
    return hashlib.sha256(serialised.encode()).hexdigest()


def write_record(
    *,
    request_id: str | None = None,
    route_decision: str,
    component: str,
    control_objective: str,
    input_payload: Any,
    output_payload: Any,
) -> dict:
    record = {
        "request_id": request_id or str(uuid.uuid4()),
        "route_decision": route_decision,
        "component": component,
        "control_objective": control_objective,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "input_hash": _sha256(input_payload),
        "output_hash": _sha256(output_payload),
    }
    _append(record)
    return record


def read_records(limit: int = 100) -> list[dict]:
    if not _LOG_PATH.exists():
        return []
    records = []
    with open(_LOG_PATH, "r") as fh:
        for line in fh:
            line = line.strip()
            if line:
                records.append(json.loads(line))
    return records[-limit:]


def _append(record: dict) -> None:
    with _LOCK:
        with open(_LOG_PATH, "a") as fh:
            fh.write(json.dumps(record) + "\n")
