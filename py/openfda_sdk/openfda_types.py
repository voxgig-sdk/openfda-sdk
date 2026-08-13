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
    meta: dict
    results: list


class Drug(TypedDict, total=False):
    meta: dict
    results: list


class DrugListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Drugsfda(TypedDict, total=False):
    meta: dict
    results: list


class DrugsfdaListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Enforcement(TypedDict, total=False):
    meta: dict
    results: list


class EnforcementListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Event(TypedDict, total=False):
    meta: dict
    results: list


class EventListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Label(TypedDict, total=False):
    meta: dict
    results: list


class LabelListMatch(TypedDict, total=False):
    meta: dict
    results: list


class N510k(TypedDict, total=False):
    meta: dict
    results: list


class N510kListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Ndc(TypedDict, total=False):
    meta: dict
    results: list


class NdcListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Nsde(TypedDict, total=False):
    meta: dict
    results: list


class NsdeListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Pma(TypedDict, total=False):
    meta: dict
    results: list


class PmaListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Problem(TypedDict, total=False):
    meta: dict
    results: list


class ProblemListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Shortage(TypedDict, total=False):
    meta: dict
    results: list


class ShortageListMatch(TypedDict, total=False):
    meta: dict
    results: list


class Substance(TypedDict, total=False):
    meta: dict
    results: list


class SubstanceListMatch(TypedDict, total=False):
    meta: dict
    results: list
