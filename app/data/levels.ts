export interface LevelData {
  id: number;
  slug: string;
  title: string;
  topic: string;
  missionStory: string;
  csApplication: string;
  mathFormula: string;
  instructions: string;
  interactiveType:
    | "rule-of-sum-prod"
    | "permutations"
    | "combinations"
    | "binomial"
    | "pigeonhole"
    | "pie"
    | "derangements"
    | "multisets"
    | "partitions"
    | "recurrence"
    | "generating-functions";
  hint: string;
  solutionExplanation: string;
}

export const LEVELS: LevelData[] = [
  {
    id: 1,
    slug: "firewall-port-matrix",
    title: "Mission 1: The Firewall Gateway",
    topic: "Addition & Multiplication Rules",
    missionStory:
      "Dr. CyberNull has locked the mainframe behind a dual-stage gateway. You need to route an exploit payload across independent networks or multi-hop subnet tunnels.",
    csApplication:
      "Network routing and security analysis: When choices are mutually exclusive (disjoint paths), we add possibilities |A ∪ B| = |A| + |B|. When independent sequential steps must occur (multi-tier proxies), we multiply |A × B| = |A| × |B|.",
    mathFormula: "Rule of Sum: |A ∪ B| = |A| + |B|  |  Rule of Product: |A × B| = |A| × |B|",
    instructions:
      "Stage 1 has 3 Fiber lines OR 2 Satellite uplink paths. Stage 2 requires routing sequentially through 4 microservices AND then 5 encryption proxies. Calculate the total valid security bypass routes!",
    interactiveType: "rule-of-sum-prod",
    hint: "For Stage 1, use the Sum Rule (3 + 2). For Stage 2, use the Product Rule (4 × 5). If the full exploit requires choosing ONE route from Stage 1 OR ONE route from Stage 2?",
    solutionExplanation:
      "Direct paths in Stage 1 = 3 + 2 = 5 paths (Addition Rule). Compound paths in Stage 2 = 4 × 5 = 20 paths (Multiplication Rule). Overall ways to enter the gateway (Stage 1 OR Stage 2) = 5 + 20 = 25 routes.",
  },
  {
    id: 2,
    slug: "quantum-key-permutations",
    title: "Mission 2: Quantum Key Decryption",
    topic: "Permutations (With and Without Repetition)",
    missionStory:
      "A rogue AI's memory cache has a 4-digit security PIN without repeating digits chosen from 6 unique symbols, plus a token scrambler of word 'ACCESS'.",
    csApplication:
      "Cryptanalysis and Brute-force time complexity: Permutations P(n, r) measure sequential key-space search size when order matters. Without repetition: n! / (n - r)!. With indistinguishable items (like duplicate characters in passwords): n! / (n1! n2! ... nk!).",
    mathFormula: "P(n, r) = n! / (n - r)!  |  Multiset Permutation = n! / (n_1! · n_2! · ...)",
    instructions:
      "Step A: How many unique 4-symbol tokens can be formed from 6 unique glyphs without repetition? Step B: How many unique anagram hashes can be generated from the 6-letter word 'ACCESS' (A=1, C=2, E=1, S=2)?",
    interactiveType: "permutations",
    hint: "For Step A: P(6, 4) = 6 × 5 × 4 × 3. For Step B: 'ACCESS' has 6 letters with 2 'C's and 2 'S's, so 6! / (2! · 2!).",
    solutionExplanation:
      "Step A = P(6, 4) = 6! / (6 - 4)! = 720 / 2 = 360. Step B = 6! / (2! × 2!) = 720 / 4 = 180 anagrams.",
  },
  {
    id: 3,
    slug: "cluster-core-combinations",
    title: "Mission 3: Kubernetes Pod Allocation",
    topic: "Combinations and Related Identities",
    missionStory:
      "You have an 8-node Kubernetes server pool. You must deploy an unbreakable quorum cluster by choosing 5 nodes where order doesn't matter, and verify Pascal's symmetry identity C(8, 5) = C(8, 3).",
    csApplication:
      "Distributed consensus (Raft/Paxos quorum size) and database replica sets: Choosing r worker nodes out of n available machines where node order is irrelevant uses Combinations C(n, r) = n! / (r!(n-r)!).",
    mathFormula: "C(n, r) = (n choose r) = n! / (r! · (n - r)!)  and  C(n, r) = C(n, n - r)",
    instructions:
      "Select nodes on the interactive grid or compute the exact number of ways to pick a 5-node quorum from 8 cloud nodes. Also notice how picking 5 active nodes is equivalent to choosing 3 idle nodes!",
    interactiveType: "combinations",
    hint: "C(8, 5) = (8 × 7 × 6 × 5 × 4) / (5 × 4 × 3 × 2 × 1) = (8 × 7 × 6) / (3 × 2 × 1).",
    solutionExplanation:
      "C(8, 5) = 8! / (5! · 3!) = (8 × 7 × 6) / 6 = 56 valid cluster topologies. Notice C(8, 5) = C(8, 3) = 56.",
  },
  {
    id: 4,
    slug: "neural-binomial-expansion",
    title: "Mission 4: Neural Bit-Flip & Pascal's Matrix",
    topic: "Binomial Theorem and Pascal's Triangle",
    missionStory:
      "Dr. CyberNull injected bit-flip noise into a 6-bit quantum register (x + y)^6. We need to evaluate the coefficient of x^4 y^2 to isolate double-bit memory corruptions.",
    csApplication:
      "Error-correcting codes (Hamming distance, Reed-Solomon), binomial distribution in packet loss probabilities, and bit-string weight analysis: The coefficient of x^(n-k) y^k gives exactly the number of n-bit words with k errors: C(n, k).",
    mathFormula: "(x + y)^n = ∑ [k=0 to n] C(n, k) · x^(n - k) · y^k",
    instructions:
      "Inspect Pascal's Triangle row n = 6. Identify the binomial coefficient for the term x^4 y^2 and the total sum of all possible bit states 2^n.",
    interactiveType: "binomial",
    hint: "The term is C(6, 2) · x^4 y^2. What is C(6, 2)? And what is the sum of row 6: 2^6?",
    solutionExplanation:
      "By the Binomial Theorem, coefficient of x^4 y^2 is C(6, 2) = 6! / (2! · 4!) = 15. The total sum of all coefficients in row 6 is ∑ C(6, k) = 2^6 = 64.",
  },
  {
    id: 5,
    slug: "hash-collision-pigeonhole",
    title: "Mission 5: Hash Table Collision Chamber",
    topic: "Pigeonhole Principle (Basic and Generalized)",
    missionStory:
      "Incoming telemetry packets are mapped into a hash table of size M = 10 buckets. Infiltrate the server by generating enough data keys to guarantee at least one bucket suffers high congestion.",
    csApplication:
      "Hash collisions, Birthday Paradox, Denial of Service (Algorithmic Complexity Attacks), and lossless compression limits (pigeonhole proves no lossless algorithm can compress every file).",
    mathFormula: "Basic: If n > k, at least one bucket has ≥ 2 items.  Generalized: ⌈n / k⌉ items.",
    instructions:
      "1) What is the minimum number of keys needed to guarantee at least ONE bucket contains ≥ 2 keys in a 10-bucket table? 2) To guarantee that at least one bucket has at least 4 keys, how many packets N must be sent?",
    interactiveType: "pigeonhole",
    hint: "Basic: n = k + 1. Generalized: ⌈N / 10⌉ ≥ 4 implies (N - 1) / 10 ≥ 3, so N = 10 × 3 + 1.",
    solutionExplanation:
      "For basic collision: 10 + 1 = 11 keys (by Pigeonhole Principle). For generalized 4 collisions: N = 10 × (4 - 1) + 1 = 31 keys guarantee ⌈31/10⌉ = 4 items.",
  },
  {
    id: 6,
    slug: "network-filter-pie",
    title: "Mission 6: Venn Protocol Sanitizer",
    topic: "Principle of Inclusion-Exclusion (PIE)",
    missionStory:
      "Dr. CyberNull deployed malicious bots across 3 overlapping botnets: Botnet A (Spam), Botnet B (DDoS), Botnet C (Crypto-mining). Disinfect the enterprise subnet by computing unique infected hosts.",
    csApplication:
      "Database SQL UNION query planning, packet filtering, network vulnerability audits, and finding size of unions of non-disjoint sets without double-counting.",
    mathFormula: "|A ∪ B ∪ C| = |A| + |B| + |C| - (|A∩B| + |B∩C| + |A∩C|) + |A∩B∩C|",
    instructions:
      "Given |A|=50, |B|=40, |C|=30 hosts. Pairwise overlaps: |A∩B|=15, |B∩C|=10, |A∩C|=12. All three overlapping |A∩B∩C|=5. Calculate the total number of unique compromised hosts |A ∪ B ∪ C|.",
    interactiveType: "pie",
    hint: "Apply PIE: Add single sets, subtract double overlaps, add back the triple overlap.",
    solutionExplanation:
      "|A ∪ B ∪ C| = (50 + 40 + 30) - (15 + 10 + 12) + 5 = 120 - 37 + 5 = 88 unique infected hosts.",
  },
  {
    id: 7,
    slug: "cyber-vault-derangements",
    title: "Mission 7: The Cryptographic Key Shuffler",
    topic: "Derangements and Applications",
    missionStory:
      "To prevent predictable side-channel analysis, an authentication HSM must assign 5 encryption keys to 5 server slots such that NO key returns to its original position (a complete derangement !n or D_n).",
    csApplication:
      "Randomized security protocols, cryptographically secure Fisher-Yates derangement shuffling, test-bench obfuscation, and hat-check problem analysis in randomized algorithms.",
    mathFormula: "!n = D_n = n! · ∑ [k=0 to n] (-1)^k / k!  or  D_n = (n-1)(D_{n-1} + D_{n-2})",
    instructions:
      "Compute !4 (for 4 keys) and !5 (for 5 keys). Observe how the ratio D_n / n! rapidly approaches 1/e ≈ 0.367879!",
    interactiveType: "derangements",
    hint: "D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44. You can use D_n = (n-1)(D_{n-1} + D_{n-2}).",
    solutionExplanation:
      "!4 = 9. For 5 keys: !5 = (5 - 1) × (!4 + !3) = 4 × (9 + 2) = 4 × 11 = 44 derangements. Out of 120 total permutations, 44/120 = 36.67% are deranged.",
  },
  {
    id: 8,
    slug: "resource-multisets",
    title: "Mission 8: Cloud CPU Core Allocator",
    topic: "Counting with Repetition and Multisets (Stars & Bars)",
    missionStory:
      "You have 10 identical virtual CPU compute units (stars) that must be distributed across 4 distinct worker containers (bars), with containers allowed to receive 0 cores.",
    csApplication:
      "Cloud resource provisioning (Kubernetes cgroups allocation), thread pool distribution, packet buffer queue partitioning, and polynomial term counting.",
    mathFormula: "Number of ways = (n + r - 1 choose r) = (n + k - 1 choose k - 1)",
    instructions:
      "Distribute n = 10 identical CPU credits among k = 4 different microservice queues. Use the Stars and Bars formula C(n + k - 1, k - 1).",
    interactiveType: "multisets",
    hint: "Here n = 10 items, k = 4 bins. Stars = 10, Bars = 4 - 1 = 3. Formula: C(10 + 4 - 1, 4 - 1) = C(13, 3).",
    solutionExplanation:
      "Number of multiset combinations = C(10 + 4 - 1, 4 - 1) = C(13, 3) = (13 × 12 × 11) / (3 × 2 × 1) = 286 allocations.",
  },
  {
    id: 9,
    slug: "packet-partitions-compositions",
    title: "Mission 9: MTU Packet Fragmentation Engine",
    topic: "Integer Partitions and Compositions",
    missionStory:
      "A network router receives an 5 KB buffer and must fragment it into transmission chunks. Does the arrival order of packets matter? Compare integer Compositions (ordered) vs Partitions (unordered).",
    csApplication:
      "Network Packet fragmentation (MTU sizing), memory page-frame splitting (Buddy memory allocator), parallel thread workload partitioning, and cache line subdivision.",
    mathFormula: "Compositions of n: 2^(n-1)  |  Compositions into k parts: C(n-1, k-1)  |  Partitions p(n)",
    instructions:
      "1) How many ordered compositions exist for integer n = 5? 2) How many compositions of 5 into exactly 3 positive parts? 3) Explore the Ferrers / Young diagram for unordered partitions p(5)!",
    interactiveType: "partitions",
    hint: "Total compositions of n = 2^(n-1) = 2^4 = 16. Compositions of n into k parts = C(n-1, k-1) = C(4, 2) = 6. Unordered partitions of 5: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1 (total 7).",
    solutionExplanation:
      "Ordered compositions = 2^(5-1) = 16. With k=3 parts: C(5-1, 3-1) = C(4, 2) = 6. The number of unordered partitions p(5) = 7.",
  },
  {
    id: 10,
    slug: "algo-complexity-recurrence",
    title: "Mission 10: Recursive Algorithm Complexity Matrix",
    topic: "Recurrence Relations and Their Solutions",
    missionStory:
      "The rogue AI runs recursive maze-search subroutines: Fibonacci-type caching T(n) = T(n-1) + T(n-2), and MergeSort divide-and-conquer T(n) = 2T(n/2) + O(n). Solve their characteristic equations!",
    csApplication:
      "Algorithm runtime analysis (Time Complexity of Divide & Conquer, Master Theorem), Dynamic Programming state transitions, tree depth sizing, and automated stack space prediction.",
    mathFormula: "Linear Homogeneous: ar^2 + br + c = 0  |  MergeSort: T(n) = 2T(n/2) + n ⇒ O(n log n)",
    instructions:
      "Solve the second-order recurrence a_n = 5a_{n-1} - 6a_{n-2} with a_0 = 1, a_1 = 4. What are the characteristic roots r_1, r_2 and the general closed-form formula?",
    interactiveType: "recurrence",
    hint: "Characteristic equation: r^2 - 5r + 6 = 0 ⇒ (r - 2)(r - 3) = 0. Solution: a_n = A·2^n + B·3^n. Use a_0=1 and a_1=4 to find A and B.",
    solutionExplanation:
      "Roots are r = 2 and r = 3. a_n = A(2^n) + B(3^n). At n=0: A + B = 1. At n=1: 2A + 3B = 4. Subtracting gives B = 2, A = -1. Closed form: a_n = 2·(3^n) - (2^n). At n=3: 2(27) - 8 = 46.",
  },
  {
    id: 11,
    slug: "generating-function-oracle",
    title: "Mission 11: The Generating Function Oracle",
    topic: "Generating Functions and Applications",
    missionStory:
      "To crack the master encryption core, use the ultimate combinatorial tool: the Ordinary Generating Function (OGF) G(x) = ∑ a_n x^n. Transform discrete sequences into continuous polynomial powerhouses!",
    csApplication:
      "Exact counting of paths in DAGs, change-making / knapsack DP solvers, formal language grammar parsing, cryptographic stream cipher generator analysis, and probability generating functions (PGF).",
    mathFormula: "G(x) = ∑ [n=0 to ∞] a_n x^n  |  Geometric: 1/(1 - x) = ∑ x^n  |  Convolution: A(x)B(x)",
    instructions:
      "Find the coefficient of x^6 in the generating function G(x) = 1 / (1 - x)^3 = ∑ C(n + 3 - 1, n) x^n, which counts ways to generate a 6-byte payload from 3 stream registers.",
    interactiveType: "generating-functions",
    hint: "1/(1 - x)^k = ∑ [n=0 to ∞] C(n + k - 1, n) x^n. For k = 3 and n = 6: C(6 + 3 - 1, 6) = C(8, 6) = C(8, 2).",
    solutionExplanation:
      "Coefficient of x^6 in (1 - x)^(-3) is C(6 + 3 - 1, 6) = C(8, 6) = 8! / (6! · 2!) = (8 × 7) / 2 = 28 ways. Generating functions turn difficult convolution recurrences into simple algebraic power series multiplication!",
  },
];

