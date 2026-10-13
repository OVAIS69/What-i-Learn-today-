const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const REPO_ROOT = path.resolve(__dirname, '..');
const LOG_FILE = path.join(REPO_ROOT, 'DAILY_LEARNING.md');
const AUTHOR_NAME = process.env.GIT_NAME || 'Ovais';
const AUTHOR_EMAIL = process.env.GIT_EMAIL || 'ovais.0404@gmail.com';

// Curated library of meaningful learning topics & notes
const LEARNING_TOPICS = [
  // DSA - Arrays & Two Pointers
  {
    category: 'Data Structures & Algorithms',
    topic: 'Two-Pointer Technique',
    summary: 'Optimized search in sorted arrays reducing O(N^2) brute-force to O(N) linear time.',
    details: 'Used widely for pair-sum problems, palindrome verification, and partition schemes like in QuickSort.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Sliding Window Pattern',
    summary: 'Maintains a subsegment of an array or string that expands and contracts based on conditions.',
    details: 'Ideal for finding maximum subarray sum of size K, longest substring without repeating characters, and minimum window substrings.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Fast & Slow Pointers (Floyd\'s Cycle Detection)',
    summary: 'Two pointers traversing a linked list at different speeds (1x and 2x).',
    details: 'Guarantees O(N) time and O(1) space to detect cycles and locate the middle node or cycle entrance.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Binary Search Beyond Arrays',
    summary: 'Applying binary search on monotonic answer spaces (Binary Search on Answer).',
    details: 'Useful for optimization problems such as Koko Eating Bananas, Capacity to Ship Packages within D Days, and Painter\'s Partition.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Breadth-First Search (BFS) for Shortest Paths',
    summary: 'Level-order traversal using a FIFO queue to guarantee shortest path in unweighted graphs.',
    details: 'Time complexity is O(V + E). Perfect for maze routing, peer-to-peer network hops, and nearest-neighbor searches.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Depth-First Search (DFS) & Backtracking',
    summary: 'Exhaustive exploration along branches before backtracking upon reaching invalid states.',
    details: 'Used in N-Queens, Sudoku solvers, subset generation, and finding connected components.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming: Memoization vs Tabulation',
    summary: 'Top-down with recursion & cache vs bottom-up iterative table filling.',
    details: 'Eliminates redundant subproblems in overlapping structures, turning exponential O(2^N) complexity into polynomial O(N).'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Trie (Prefix Tree)',
    summary: 'Tree structure specialized in fast retrieval of string keys with common prefixes.',
    details: 'Enables O(L) prefix lookups and autocomplete suggestions where L is the length of the query string.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Min-Heap and Max-Heap (Priority Queue)',
    summary: 'Complete binary tree maintaining heap property for O(1) access to min/max and O(log N) insertion/deletion.',
    details: 'Fundamental for Dijkstra\'s shortest path algorithm, Huffman coding, and finding top K frequent elements.'
  },
  {
    category: 'Data Structures & Algorithms',
    topic: 'Monotonic Stack',
    summary: 'Stack that maintains elements strictly increasing or decreasing.',
    details: 'Solves Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in linear O(N) time.'
  },

  // Python Best Practices & Advanced Concepts
  {
    category: 'Python Programming',
    topic: 'List Comprehensions & Generator Expressions',
    summary: 'Memory-efficient data transformation in idiomatic Python.',
    details: 'Generators yield items lazily on demand, drastically reducing memory footprint when processing large datasets.'
  },
  {
    category: 'Python Programming',
    topic: 'Python Decorators & Closures',
    summary: 'Higher-order functions modifying behavior of wrapped functions without altering code.',
    details: 'Commonly used for logging, timing execution, authentication checks, and memoization with @functools.lru_cache.'
  },
  {
    category: 'Python Programming',
    topic: 'Context Managers & The `with` Statement',
    summary: 'Automated setup and teardown for resource management implementing `__enter__` and `__exit__`.',
    details: 'Prevents file descriptor leaks, handles database connections safely, and simplifies thread locking.'
  },
  {
    category: 'Python Programming',
    topic: 'Python `collections` Module',
    summary: 'Specialized container datatypes: `defaultdict`, `Counter`, `deque`, and `namedtuple`.',
    details: '`deque` provides O(1) appends and pops from both ends, significantly outperforming Python lists for queue operations.'
  },
  {
    category: 'Python Programming',
    topic: '`__slots__` Optimization in Python Classes',
    summary: 'Explicit attribute declaration preventing dynamic `__dict__` creation.',
    details: 'Reduces RAM usage by up to 40-50% for instances when instantiating millions of lightweight data objects.'
  },
  {
    category: 'Python Programming',
    topic: 'Type Hinting & Static Typing with `typing`',
    summary: 'Adding typing annotations (Optional, Union, Dict, Callable) for static code analysis.',
    details: 'Improves IDE autocompletion, self-documents codebase, and catches subtle type errors early with Mypy.'
  },

  // Web, Systems & Backend
  {
    category: 'Backend & System Design',
    topic: 'Database Indexing & B-Trees',
    summary: 'Accelerating search queries from full table scans O(N) to balanced tree traversals O(log N).',
    details: 'Composite indexes must adhere to the leftmost prefix rule to be effectively utilized by the query planner.'
  },
  {
    category: 'Backend & System Design',
    topic: 'REST API Best Practices & Idempotency',
    summary: 'Designing predictable endpoints using proper HTTP verbs and idempotent methods (GET, PUT, DELETE).',
    details: 'Using idempotency keys in payment and order processing prevents double charges during network retries.'
  },
  {
    category: 'Backend & System Design',
    topic: 'Redis Caching Strategies',
    summary: 'Cache-Aside, Write-Through, and Write-Behind patterns for low-latency data access.',
    details: 'Setting sensible TTLs and eviction policies (LRU/LFU) prevents cache stampede and stale data propagation.'
  },
  {
    category: 'Backend & System Design',
    topic: 'CAP Theorem in Distributed Systems',
    summary: 'A distributed system can guarantee at most two out of Consistency, Availability, and Partition Tolerance.',
    details: 'Since network partitions are inevitable in real networks, modern distributed systems trade off between CP and AP models.'
  },

  // Git & Workflow
  {
    category: 'Git & Developer Tools',
    topic: 'Git Interactive Rebase & History Cleanup',
    summary: 'Squashing, rewording, and reordering commits with `git rebase -i`.',
    details: 'Helps maintain a clean, readable linear git commit history before merging feature branches into main.'
  },
  {
    category: 'Git & Developer Tools',
    topic: 'Git Stash & Worktrees',
    summary: 'Context-switching techniques without dirtying working trees or losing uncommitted progress.',
    details: '`git worktree` allows checking out multiple branches simultaneously in separate directories.'
  }
];

function runCmd(cmd) {
  try {
    return execSync(cmd, { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : err.message;
    throw new Error(`Command failed: ${cmd}\nError: ${stderr}`);
  }
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function ensureLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    const initialContent = `# 📚 Daily Learning & Activity Log\n\nContinuous improvement notes, DSA patterns, algorithms, and technical concepts for **What I Learn Today**.\n\n---\n\n## 📝 Learning Entries\n\n`;
    fs.writeFileSync(LOG_FILE, initialContent, 'utf8');
  }
}

function appendLearningEntry() {
  ensureLogFile();
  const item = getRandomItem(LEARNING_TOPICS);
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  const entry = `### 📌 ${item.topic} (${item.category})\n` +
    `- **Timestamp:** \`${dateStr}\`\n` +
    `- **Overview:** ${item.summary}\n` +
    `- **Key Takeaway:** ${item.details}\n\n`;

  const existing = fs.readFileSync(LOG_FILE, 'utf8');
  fs.writeFileSync(LOG_FILE, existing + entry, 'utf8');

  return {
    item,
    commitMsg: `docs: record notes on ${item.topic} [${item.category}]`
  };
}

function configureGit() {
  try {
    const currentName = runCmd('git config user.name');
    if (!currentName) runCmd(`git config user.name "${AUTHOR_NAME}"`);
  } catch {
    runCmd(`git config user.name "${AUTHOR_NAME}"`);
  }

  try {
    const currentEmail = runCmd('git config user.email');
    if (!currentEmail) runCmd(`git config user.email "${AUTHOR_EMAIL}"`);
  } catch {
    runCmd(`git config user.email "${AUTHOR_EMAIL}"`);
  }
}

function main() {
  const args = process.argv.slice(2);
  let count = 1;
  let shouldPush = false;

  for (const arg of args) {
    if (arg.startsWith('--count=')) {
      count = parseInt(arg.split('=')[1], 10) || 1;
    } else if (arg === '--push') {
      shouldPush = true;
    }
  }

  // Ensure git is configured
  configureGit();

  console.log(`🚀 Starting auto-committer...`);
  console.log(`👤 Author: ${AUTHOR_NAME} <${AUTHOR_EMAIL}>`);
  console.log(`📝 Total commits to generate: ${count}`);

  for (let i = 1; i <= count; i++) {
    const { item, commitMsg } = appendLearningEntry();
    runCmd('git add DAILY_LEARNING.md');
    
    // Check if there are changes to commit
    const status = runCmd('git status --porcelain');
    if (status) {
      runCmd(`git commit -m "${commitMsg}"`);
      console.log(`[${i}/${count}] Committed: "${commitMsg}"`);
    } else {
      console.log(`[${i}/${count}] No changes detected to commit.`);
    }

    // Small delay between multiple commits for realistic timestamps
    if (i < count) {
      const waitMs = 1200 + Math.floor(Math.random() * 800);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, waitMs);
    }
  }

  if (shouldPush) {
    console.log('🔄 Rebase pulling and pushing changes to remote...');
    try {
      runCmd('git pull --rebase origin main');
      runCmd('git push origin main');
      console.log('✅ Successfully pushed commits to GitHub!');
    } catch (pushErr) {
      console.error('❌ Push failed:', pushErr.message);
      process.exit(1);
    }
  } else {
    console.log('ℹ️ Changes committed locally. Use --push or "git push" to push to GitHub.');
  }
}

main();
