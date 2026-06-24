from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

import yaml

_CONFIG_PATH = Path(__file__).parent / "regulations.yaml"


@lru_cache(maxsize=1)
def load_config() -> dict:
    with open(_CONFIG_PATH, "r") as fh:
        return yaml.safe_load(fh)


def get_regulation(key: str) -> dict:
    return load_config()["regulations"][key]


def get_solidarity_config() -> dict:
    return load_config()["solidarity_contribution"]


def get_training_comp_config() -> dict:
    return load_config()["training_compensation"]


def get_deadline_config(mechanism: str) -> dict:
    return load_config()["deadlines"][mechanism.lower()]


def get_readiness_checklist(mechanism: str) -> list[dict]:
    return load_config()["readiness_checklists"][mechanism]["items"]
