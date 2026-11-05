// Groups each `## Heading` in a case study with everything under it, up to the next `##`,
// into <section class="cs-section">. The case study page lays each section out in two columns:
// the heading on the left, the content on the right. Anything before the first `##` goes into
// <section class="cs-section cs-lead">. Imports and exports stay at the top level.
export default function rehypeSections() {
  return (tree) => {
    const section = (classes, children = []) => ({
      type: 'element',
      tagName: 'section',
      properties: { className: classes },
      children,
    });

    const top = [];
    const lead = section(['cs-section', 'cs-lead']);
    let current = null;
    let leadAt = -1;

    for (const node of tree.children) {
      if (node.type === 'mdxjsEsm') {
        top.push(node);
        continue;
      }
      if (node.type === 'element' && node.tagName === 'h2') {
        current = section(['cs-section'], [node]);
        top.push(current);
        continue;
      }
      if (current) {
        current.children.push(node);
      } else {
        if (leadAt < 0) leadAt = top.length;
        lead.children.push(node);
      }
    }

    const leadHasContent = lead.children.some((n) => n.type !== 'text' || n.value.trim());
    if (leadHasContent) top.splice(leadAt < 0 ? 0 : leadAt, 0, lead);
    tree.children = top;
  };
}
