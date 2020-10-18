const defaultAspen = `
# This section, the "discourse", is a simple configuration
# that helps Aspen understand a few things.

default:
  # The default label is "label" (Neo4j/Cypher) or "type"
  # of node that will be assigned to any unlabeled node, like
  # (Liz). A labeled node would be (Person: Liz), and here the
  # type/label is "Person".
  label: Person

  # For this Aspen file, the default attribute is "name". This
  # is for every type/label, not just Person. For example, in
  # (Company: Kabletown), "Kabletown" is assigned to the
  # attribute \`name\`.
  attribute: name

# The \`reciprocal\` key tells Aspen which relationships are
# reciprocal (a.k.a. "mutual"). These will show up as
# undirected relationships (there won't be an arrow).
reciprocal: knows, is friends with
----
# This section, the "narrative", is where we write out
# our graph data in sort of a story format.

# The simplest relationship is just (Node) [edge] (node).
# Both of these nodes are unlabeled, so they'll both be a
# Person node by default, based on the above discourse.
(Liz) [knows] (Jack).

# The second node is a labeled node: it has a type/label,
# followed by a colon, followed by content. With the above
# discourse, "Kabletown" will be assigned to the "name"
# attribute.
(Liz) [works at] (Company: Kabletown).

# Here we have a list. Lists can be written using the
# form: (Node) [edge] (Label).
# Because we have (Actor) after the relationship, the first
# two list items will turn into nodes with the type/label
# "Actor".
# We can also specify types for individual items. The last
# item will be a node with type/label "FiredActor".
(Liz) [supervises] (Actor):
  - Jenna
  - Tracy
  - Josh (FiredActor)

# Here we have another list, this time without a type in the
# first line. If there's no type specified, the default label will
# be applied, so all but the last list item will be a Person
# node, and the last item will be a Comedian node.
(Liz) [supervises]:
  - Frank Rossitano
  - James "Toofer" Spurlock
  - Lutz
  - Sue
  - Abby Flynn (Comedian)
`.trim();

export default defaultAspen;