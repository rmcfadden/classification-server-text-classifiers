export interface PrefixTreeNode {
    value?: string;
    children: Map<string, PrefixTreeNode>;
}
