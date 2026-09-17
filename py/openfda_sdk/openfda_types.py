# Typed models for the Openfda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Classification(TypedDict, total=False):
    meta: dict
    results: list


class ClassificationListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Drug(TypedDict):
    pass


class DrugListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Drugsfda(TypedDict, total=False):
    meta: dict
    results: list


class DrugsfdaListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Enforcement(TypedDict, total=False):
    meta: dict
    results: list


class EnforcementListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Event(TypedDict, total=False):
    meta: dict
    results: list


class EventListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Label(TypedDict, total=False):
    meta: dict
    results: list


class LabelListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class N510k(TypedDict, total=False):
    meta: dict
    results: list


class N510kListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Ndc(TypedDict, total=False):
    meta: dict
    results: list


class NdcListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Nsde(TypedDict, total=False):
    meta: dict
    results: list


class NsdeListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Pma(TypedDict, total=False):
    meta: dict
    results: list


class PmaListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Problem(TypedDict, total=False):
    meta: dict
    results: list


class ProblemListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Shortage(TypedDict, total=False):
    meta: dict
    results: list


class ShortageListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int


class Substance(TypedDict, total=False):
    meta: dict
    results: list


class SubstanceListMatch(TypedDict, total=False):
    count: str
    limit: int
    search: str
    skip: int
