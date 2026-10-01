"""Python port of `generateEdges` from
libs/node-dist-vis/models/src/lib/edges/generator.ts
"""

from __future__ import annotations

import math
import warnings
from dataclasses import dataclass
from typing import Any, Iterable, Iterator, Optional, TypedDict


@dataclass(frozen=True)
class Node:
    x: float
    y: float
    cell_type: str
    z: Optional[float] = None
    data: Any = None


EdgeEntry = TypedDict(
    "EdgeEntry",
    {
        "Cell ID": int,
        "Target ID": int,
        "X1": float,
        "Y1": float,
        "Z1": float,
        "X2": float,
        "Y2": float,
        "Z2": float,
    },
)


@dataclass
class _Cell:
    index: int
    type: str
    x: float
    y: float
    z: float
    object: Node


_CELL_NEIGHBORHOOD_OFFSETS: list[tuple[int, int]] = [
    (-1, -1),
    (-1, 0),
    (-1, 1),
    (1, -1),
    (1, 0),
    (1, 1),
    (0, -1),
    (0, 0),
    (0, 1),
]


class _CellGrid:
    def __init__(self) -> None:
        self.grid: dict[int, dict[int, list[_Cell]]] = {}

    def add_cell_at(self, x: int, y: int, cell: _Cell) -> None:
        self._ensure_cells_exists_at(x, y).append(cell)

    def get_cells_at(self, x: int, y: int) -> Optional[list[_Cell]]:
        return self.grid.get(x, {}).get(y)

    def get_non_empty_indices(self) -> Iterator[tuple[int, int]]:
        for x, column in self.grid.items():
            for y in column:
                yield x, y

    def get_neighborhood(self, x: int, y: int) -> Iterator[_Cell]:
        for x_offset, y_offset in _CELL_NEIGHBORHOOD_OFFSETS:
            cells = self.get_cells_at(x + x_offset, y + y_offset)
            if cells is not None:
                yield from cells

    def is_empty(self) -> bool:
        return len(self.grid) == 0

    def _ensure_cells_exists_at(self, x: int, y: int) -> list[_Cell]:
        return self.grid.setdefault(x, {}).setdefault(y, [])


def _partition_nodes(
    nodes: Iterable[Node],
    target_selector: str,
    max_distance: float,
) -> tuple[_CellGrid, _CellGrid]:
    source_cells = _CellGrid()
    target_cells = _CellGrid()

    for index, node in enumerate(nodes):
        cell = _Cell(
            index=index,
            type=node.cell_type,
            x=node.x,
            y=node.y,
            z=0 if node.z is None else node.z,
            object=node,
        )
        grid = target_cells if cell.type == target_selector else source_cells
        grid_x = math.floor(cell.x / max_distance)
        grid_y = math.floor(cell.y / max_distance)

        grid.add_cell_at(grid_x, grid_y, cell)

    return source_cells, target_cells


def _cell_distance_squared(cell1: _Cell, cell2: _Cell) -> float:
    x = cell1.x - cell2.x
    y = cell1.y - cell2.y
    z = cell1.z - cell2.z
    return x * x + y * y + z * z


def _find_closest_cell(
    cell: _Cell, candidates: list[_Cell], max_distance: float
) -> Optional[_Cell]:
    distance = max_distance * max_distance
    closest: Optional[_Cell] = None
    for candidate in candidates:
        value = _cell_distance_squared(cell, candidate)
        if value < distance:
            distance = value
            closest = candidate

    return closest


def generate_edges(
    nodes: Iterable[Node],
    target_selector: str,
    max_distance: float,
) -> Iterator[EdgeEntry]:
    """Yield an edge from each non-target node to its closest target node
    within `max_distance`. Nodes are identified by their position in `nodes`.
    """
    source_cells, target_cells = _partition_nodes(nodes, target_selector, max_distance)
    if target_cells.is_empty():
        warnings.warn(f"No target cells found using selector '{target_selector}'")
        return

    for x, y in source_cells.get_non_empty_indices():
        candidates = list(target_cells.get_neighborhood(x, y))
        for cell in source_cells.get_cells_at(x, y) or []:
            closest = _find_closest_cell(cell, candidates, max_distance)
            if closest is not None:
                yield {
                    "Cell ID": cell.index,
                    "Target ID": closest.index,
                    "X1": cell.x,
                    "Y1": cell.y,
                    "Z1": cell.z,
                    "X2": closest.x,
                    "Y2": closest.y,
                    "Z2": closest.z,
                }
