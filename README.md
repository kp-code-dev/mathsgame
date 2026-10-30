# Foundation of Mathematics — Innovative Assignment

> **Subject:** Foundation of Mathematics (FM)  
> **Course / University:** Silver Oak University  
> **Faculty:** Prof. Meghana Trivedi & Prof. Keyuri Shah  
> **Assignment Format:** Interactive Mathematical Simulation & Educational Web Game  
> **Tech Stack:** Next.js, React, Tailwind CSS, Three.js, GSAP, React Icons, Canvas Confetti  

---

## 🌟 Project Overview

**Foundation of Mathematics: Applied Computing Lab** is an innovative interactive web game designed to move mathematics beyond traditional formula memorization. It demonstrates how core mathematical theorems directly govern software systems, cloud infrastructure, cryptography, and algorithm design.

The project contains complete interactive modules for all **4 Units** of the syllabus with contextual 3D visualizers:

- 🎮 **Unit 1: Combinatorics Quest (Cyber Heist)** — Infiltrating security firewalls using counting principles, permutations, quorums, derangements, recurrences, and generating functions.
- 📐 **Unit 2: Numerical Convergence Lab** — Solving floating-point precision, Newton-Raphson root tangents, Gaussian elimination, Jacobi iteration, and polynomial interpolation.
- 📊 **Unit 3: OptiSim Tycoon (Operations Research & LPP)** — Optimizing cloud server allocations with 3D feasible polygons, Simplex slacks, CDN transportation, and cybersecurity minimax game theory.
- ⚡ **Unit 4: Logic Circuit Arena (Lattices & Boolean Algebra)** — Role-based access POSETs, 3D Hasse diagram divisor lattices (GCD/LCM), complement laws, and Stone's Representation Theorem.

---

## 📚 Complete Syllabus Coverage

### Unit 1: Introduction to Combinatorics and Its Applications
1. **Basic Counting Principles:** Addition & Multiplication rules in network routing and multi-tier proxies ($|A \cup B| = |A| + |B|$ vs $|A \times B| = |A| \cdot |B|$).
2. **Permutations:** Password keyspace entropy ($P(n,r) = \frac{n!}{(n-r)!}$) and anagram string hashing ($\frac{n!}{n_1! n_2! \dots}$).
3. **Combinations & Related Identities:** Kubernetes cluster quorum sizing ($C(n, r) = C(n, n-r)$).
4. **Binomial Theorem & Pascal's Triangle:** Bit-flip corruptions and Hamming distance error-correcting codes.
5. **Pigeonhole Principle (Basic & Generalized):** Hash table collisions and algorithmic complexity DoS limits with an **embedded 3D Hash Collision Chamber**.
6. **Principle of Inclusion-Exclusion (PIE):** SQL UNION query planning and multi-botnet disinfection ($|A \cup B \cup C|$).
7. **Derangements & Applications:** Zero-correlation cryptographic key rotation ($!n \approx n!/e$).
8. **Counting with Repetition & Multisets:** Cloud vCPU cgroup allocation via Stars & Bars ($\binom{n+k-1}{k-1}$).
9. **Integer Partitions & Compositions:** Network router MTU packet fragmentation ($2^{n-1}$ vs $p(n)$).
10. **Recurrence Relations & Solutions:** Characteristic polynomials ($ar^2 + br + c = 0$) for recursive algorithm time complexity.
11. **Generating Functions & Applications:** Ordinary generating functions ($G(x) = \frac{1}{(1-x)^k}$) for polynomial convolution counting.

### Unit 2: Numerical Methods
1. **Types of Errors:** Absolute, Relative, and Percentage error in IEEE 754 floating-point operations.
2. **Root-Finding Methods:** Bisection, Regula-Falsi, Secant, and **Newton-Raphson Method** with an **embedded 3D Tangent Line Convergence visualizer**.
3. **System of Linear Equations:** Gauss Elimination and Gauss-Jordan row reduction for load balance matrices.
4. **Iterative Solvers:** Gauss-Seidel and Jacobi iterative matrix convergence.
5. **Interpolation:** Newton's Forward/Backward and Lagrange polynomial interpolation for audio and game physics frames.

### Unit 3: Operations Research and Linear Programming
1. **Graphical Linear Programming:** Feasible region boundary analysis and corner-point evaluation with an **embedded 3D Feasible Polygon & Golden Vertex $(4, 2)$ visualizer**.
2. **Standard Form of LPP:** Slack variable additions for Simplex tableaus.
3. **Duality Concept:** Dual problem formulation and shadow pricing in distributed clusters.
4. **Transportation Problem:** Initial Basic Feasible Solution (IBFS) via North-West Corner Rule for CDN traffic redirection.
5. **Assignment Problem:** Hungarian Method for optimal thread-to-core binding.
6. **Game Theory:** Two-person zero-sum games, Maximin vs Minimax saddle point criteria in cybersecurity honeypots.

### Unit 4: Lattices and Boolean Algebra
1. **Relations & Ordering:** POSET axioms (Reflexive, Antisymmetric, Transitive) in Linux permissions and AWS IAM.
2. **Lattices as POSETs:** Meet (GLB / GCD) and Join (LUB / LCM) with an **embedded 3D Hasse Diagram Divisor Lattice ($D_{12}$) visualizer**.
3. **Distributive & Complemented Lattices:** Boolean complement laws ($x \vee x' = 1, x \wedge x' = 0$) in logic gate minimization.
4. **Atoms & Anti-Atoms:** Minimal non-zero basis generation in Binary Decision Diagrams (BDD).
5. **Stone's Representation Theorem:** Isomorphism between finite Boolean algebras of size $2^k$ and power set field of sets.

---

## 🎯 Meaningful 3D Concept Visualizers (Three.js & GSAP)

Rather than decorative models, 3D simulations are embedded directly within the specific missions where abstract concepts are difficult to grasp from text alone:

| Unit | Embedded Mission | Interactive 3D Concept |
|---|---|---|
| **Unit 1** | **Mission 5** (Pigeonhole Principle) | **3D Hash Collision Chamber:** 10 physical cylinders with keys dropped via physics. Visually proves why dropping $> 10$ keys mathematically guarantees a collision (Red alert). |
| **Unit 2** | **Mission 2** (Newton-Raphson Method) | **3D Curve & Tangent Solver:** Renders $f(x) = x^2 - 5$ with a tangent line drawn from guess $x_0 = 2.0$ down to $x_1 = 2.25$ on the x-axis, demonstrating quadratic convergence. |
| **Unit 3** | **Mission 1** (Linear Programming LPP) | **3D Feasible Polygon:** Renders the multi-constraint extruded polygon and highlights the **Golden Corner Vertex $(4, 2)$**, proving optimal solutions always lie on boundary vertices. |
| **Unit 4** | **Mission 2** (Hasse Diagram Lattice) | **3D $D_{12}$ Divisibility Lattice:** Renders the 3D divisor graph for $\{4, 6\}$, visually highlighting the lower common node (Meet = GCD = 2, Green) and upper common node (Join = LCM = 12, Purple). |

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18.17 or higher)
- npm or yarn

### Installation & Launch

1. Open your terminal in the project directory:
   ```bash
   cd mathsgame
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Module Routes
- **Unit 1:** [http://localhost:3000](http://localhost:3000)
- **Unit 2:** [http://localhost:3000/unit2](http://localhost:3000/unit2)
- **Unit 3:** [http://localhost:3000/unit3](http://localhost:3000/unit3)
- **Unit 4:** [http://localhost:3000/unit4](http://localhost:3000/unit4)

---

## ✉️ Faculty Email Submission Format

If submitting this assignment via email to faculty:

- **To:** `meghanatrivedi.ca@silveroakuni.ac.in`, `keyurishah.ca@silveroakuni.ac.in`
- **Subject:** `Innovative Assignment – FM – [Unit Name] – [Your Full Name] – [Division]`

```text
Respected Ma'am,

I am submitting my Foundation of Mathematics Innovative Assignment.

Assignment Details:
• Name: [Your Name]
• Enrolment Number: [Your Enrolment Number]
• Programme: BCA / B.Tech CSE / Integrated MCA
• Semester: Semester 1 / 2
• Division: [Your Division]
• Chosen Unit: [e.g. Unit 1 — Introduction to Combinatorics and Its Applications]
• Assignment Title: Combinatorics Quest: Applied Computer Science Simulation
• Working Link / Attachment: [Attach project zip or share URL]

Project Objective & What Was Learned:
Rather than a traditional static document, I built an interactive computing game and simulation tool demonstrating how discrete and continuous mathematical principles (pigeonhole collisions, Newton-Raphson tangents, LPP feasible vertices, and lattice divisibility) form the bedrock of cybersecurity, compiler optimization, cloud scaling, and algorithm analysis.

Thank you for your guidance and support.

Sincerely,
[Your Name]
[Enrolment Number]
```

---

## 🛠️ Architecture & Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Webpack build)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Dark Cyber Theme)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Animations:** [GSAP](https://gsap.com/) (GreenSock Animation Platform) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, BoxIcons, HeroIcons)
