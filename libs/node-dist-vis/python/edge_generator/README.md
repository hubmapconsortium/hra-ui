# edge_generator

Python port of `generateEdges` from
[`models/src/lib/edges/generator.ts`](../../models/src/lib/edges/generator.ts).
Standard library only (Python 3.9+).

For every node whose `cell_type` is not `target_selector`, an edge is produced to
the closest target node within `max_distance`. Node IDs are indices into the input list.

```python
from edge_generator import Node, generate_edges

nodes = [
    Node(x=0, y=0, cell_type="T cell"),
    Node(x=3, y=4, cell_type="endothelial"),
    Node(x=50, y=50, cell_type="T cell"),
]

for edge in generate_edges(nodes, "endothelial", max_distance=10):
    print(edge)
# {'Cell ID': 0, 'Target ID': 1, 'X1': 0, 'Y1': 0, 'Z1': 0, 'X2': 3, 'Y2': 4, 'Z2': 0}
```

Unlike the TypeScript version, a warning is actually emitted when no target
nodes exist (the TS check inspects the `CellGrid` object instead of its grid).
