from __future__ import annotations

import os
import tempfile

import pytest
from fastapi.testclient import TestClient

# Point audit log to a temp file so tests don't pollute the real log
@pytest.fixture(autouse=True)
def tmp_audit_log(tmp_path, monkeypatch):
    log_file = tmp_path / "test_audit.ndjson"
    monkeypatch.setenv("AUDIT_LOG_PATH", str(log_file))
    # Reload the module-level path in logger
    import fifa_ch.audit.logger as _logger
    from pathlib import Path
    monkeypatch.setattr(_logger, "_LOG_PATH", Path(str(log_file)))
    yield log_file


@pytest.fixture
def client():
    from fifa_ch.main import app
    return TestClient(app)
