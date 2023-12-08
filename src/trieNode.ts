export interface TrieNode {
    labels: string[];
    children: Map<string, TrieNode>;
}
