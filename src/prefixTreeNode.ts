export interface PrefixTreeNode {
    labels: string[];
    children: Map<string, PrefixTreeNode>;
}
