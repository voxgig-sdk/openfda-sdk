# Typed models for the Openfda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Classification:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class ClassificationListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Drug:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class DrugListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Drugsfda:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class DrugsfdaListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Enforcement:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class EnforcementListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Event:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class EventListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Label:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class LabelListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class N510k:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class N510kListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Ndc:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class NdcListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Nsde:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class NsdeListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Pma:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class PmaListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Problem:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class ProblemListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Shortage:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class ShortageListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class Substance:
    meta: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class SubstanceListMatch:
    meta: Optional[dict] = None
    result: Optional[list] = None

