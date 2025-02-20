### Explain what does it mean by breaking consensus
A consensus-breaking change means modification to the protocol that 
alters the fundamental rule governing how nodes agree on the state of
the chain. Therefore, nodes running the old version of the software will 
disagree with nodes running the new version leading to a chain split.

### Explain why your change would break the consensus
One potential change can be made is to modify transaction fees (gas fees)
logic. Modifying gas fee calculations in a way that changes how fees are
computed or deducted will break consensus. All nodes must adopt the same logic
to avoid split.
