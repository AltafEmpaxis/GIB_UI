/**
 * Semantic Release configuration file.
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  tagFormat: 'v${version}',

  branches: [
    { name: 'dev', prerelease: 'dev' },
    { name: 'qa', prerelease: 'qa' },
    { name: 'uat', prerelease: 'uat' },
    'main',
    {
      name: 'hotfix/*',
      prerelease: '${name.replace(/^hotfix[\\/]/, "")}',
      channel: 'hotfix'
    }
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: '.', // Root directory containing package.json
        npmPublish: false // Disabled for private projects
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md', 'README.md', 'docs/**/*'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'build/my-build.zip', label: 'Build Package' }],
        labels: false // Disable labels to avoid potential GitHub label issues
      }
    ]
  ]
};

/**
 * Semantic Release Configuration
 * This configuration file controls the automated release process using semantic-release.
 * It handles version management, changelog generation, and release publishing across different branches.
 *
 * Release Workflow:
 * 1. Developer commits changes using conventional commit format
 * 2. On merge/push to configured branches, semantic-release:
 *    - Analyzes commit messages
 *    - Determines version bump
 *    - Generates changelog
 *    - Updates version in package.json
 *    - Creates git tag
 *    - Publishes GitHub release
 *
 * Version Format: v{major}.{minor}.{patch}[-{prerelease}][.{number}]
 * Examples:
 * - Production: v1.2.3
 * - Development: v1.2.3-dev.1
 * - Hotfix: v1.2.3-hotfix-123.1
 *
 * Commit Message Format Guide:
 * To trigger different version bumps, use the following commit message formats:
 *
 * 1. Patch Version (0.0.x): Bug fixes and minor changes
 *    @example fix(component): prevent memory leak in cleanup
 *    @example fix: handle edge case in data processing
 *    Result: v1.2.3 -> v1.2.4
 *
 * 2. Minor Version (0.x.0): New features (backwards-compatible)
 *    @example feat(auth): add SSO login option
 *    @example feat: implement new API endpoint
 *    Result: v1.2.3 -> v1.3.0
 *
 * 3. Major Version (x.0.0): Breaking changes
 *    @example feat(api)!: rename user endpoints
 *    @example feat!: redesign authentication flow
 *    Or include "BREAKING CHANGE:" in commit body:
 *    @example feat: update user API
 *             BREAKING CHANGE: user endpoint now requires API key
 *    Result: v1.2.3 -> v2.0.0
 *
 * Pre-release Versions:
 * Commits to different environment branches generate pre-release versions with auto-incrementing numbers:
 *
 * 1. Development (dev branch):
 *    Sequential commits on dev branch:
 *    @example First commit:  v1.2.0-dev.1
 *             Next commit:   v1.2.0-dev.2
 *             Another one:   v1.2.0-dev.3
 *    When version bumps:
 *    @example feat: new feature
 *             Results in: v1.3.0-dev.1 (resets counter for new version)
 *
 * 2. QA Testing (qa branch):
 *    Sequential commits on qa branch:
 *    @example First commit:  v1.2.1-qa.1
 *             Next commit:   v1.2.1-qa.2
 *             Another one:   v1.2.1-qa.3
 *
 * 3. UAT Testing (uat branch):
 *    Sequential commits on uat branch:
 *    @example First commit:  v1.3.0-uat.1
 *             Next commit:   v1.3.0-uat.2
 *             Another one:   v1.3.0-uat.3
 *
 * 4. Hotfix (hotfix/* branches):
 *    Sequential commits on hotfix branch:
 *    @example First commit:  v1.2.1-hotfix-123.1
 *             Next commit:   v1.2.1-hotfix-123.2
 *             Another one:   v1.2.1-hotfix-123.3
 *
 * Note: The number after the environment identifier (e.g., dev.1, dev.2, dev.3)
 * auto-increments with each release in that environment. When the version number
 * changes (due to feat, fix, or breaking change), the increment resets to 1.
 *
 * Other commit types (no version bump):
 * - chore: maintenance tasks (e.g., updating dependencies)
 * - docs: documentation updates only
 * - style: code style changes (formatting, semicolons, etc)
 * - refactor: code changes that neither fix a bug nor add a feature
 * - test: adding or updating tests
 * - ci: changes to CI/CD configuration files
 *
 * Release Process Files:
 * - package.json: Updated with new version number
 * - CHANGELOG.md: Updated with release notes
 * - Git Tags: Created for each release
 * - GitHub Releases: Published with changelog
 *
 * @type {import('semantic-release').GlobalConfig}
 */
//================================||How works||=====================================
//
/**
 * =======tagFormat: 'v${version}'========
 * Defines the format for Git tags.
 * The ${version} placeholder is replaced with the calculated version number.
 * @example v1.0.0 (production)
 * @example v1.1.0-dev.1 (development)
 * @example v1.0.1-hotfix-123.1 (hotfix)
 */
/**
 * =======branches========
 * Branch Configuration
 * Defines which branches trigger releases and how versions are generated.
 * Each branch can have its own versioning strategy:
 * - main: Production releases (v1.2.3)
 * - dev/qa/uat: Pre-releases with environment suffix (v1.2.3-dev.1)
 * - hotfix/*: Emergency fixes with custom versioning (v1.2.3-hotfix-123.1)
 *------------------------------------------------------------------------------------
 * Development branch - generates pre-releases with 'dev' identifier
 * QA branch - generates pre-releases with 'qa' identifier
 * UAT branch - generates pre-releases with 'uat' identifier
 * Main branch - generates stable production releases
 * Hotfix branches - special handling for urgent fixes
 * Pattern: hotfix/* (e.g., hotfix/bug-123)
 * Generates versions like v1.0.1-bug-123.1
 * Uses separate release channel for hotfix distributions
 */

/**
 * =======plugins========
 * Plugin Configuration
 * Defines the sequence of operations performed during the release process.
 * Each plugin handles a specific part of the release workflow.
 *
 * '@semantic-release/commit-analyzer'
 * Step 1: Commit Analyzer
 * - Parses conventional commit messages
 * - Determines the type of version bump needed
 * - Decides if release is needed
 * Uses conventional-changelog conventions
 *
 * '@semantic-release/release-notes-generator'
 * Step 2: Release Notes Generator
 * - Generates changelog content from commits
 * - Groups commits by type (feat, fix, etc.)
 * - Creates formatted release notes
 *
 * '@semantic-release/changelog'
 * Step 3: Changelog Management
 * - Updates CHANGELOG.md file
 * - Prepends new release notes
 * - Maintains history of all releases
 *
 * '@semantic-release/npm'
 * Step 4: NPM Version Management
 * - Updates version in package.json
 * - Handles package versioning
 * - No publishing to NPM (private project)
 *
 * '@semantic-release/git'
 * Step 5: Git Operations
 * - Commits updated files
 * - Creates version tag
 * - Updates repository with release info
 *
 * '@semantic-release/github'
 * Step 6: GitHub Release
 * - Creates GitHub release
 * - Publishes release notes
 * - Attaches assets if configured
 * Appears in repository's releases tab
 */
//================================||How works||=====================================
/**
 * Branch Merge Strategy Guide
 * This section outlines the complete workflow for merging changes across branches (dev → qa → uat → main)
 *
 * Development Branch (dev) Workflow:
 * 1. Update Dev Branch
 *    @command git checkout dev && git pull origin dev
 *    @purpose Ensure local dev branch is up-to-date
 * 2. Commit Changes
 *    @command git add . && git commit -m "fix(dev): trigger version bump"
 *    @purpose Record changes using conventional commit messages
 * 3. Push Changes
 *    @command git push origin dev
 *    @purpose Update remote repository with new changes
 *
 * QA Branch (qa) Workflow:
 * 4. Update QA Branch
 *    @command git checkout qa && git pull origin qa
 *    @purpose Ensure QA branch is current
 * 5. Merge Dev into QA
 *    @command git merge --no-ff dev
 *    @purpose Incorporate validated dev changes into QA
 * 6. Handle Conflicts
 *    @action Manually resolve conflicts in files
 *    @purpose Maintain correct versioning format (1.0.0-qa.x)
 * 7. Commit Merge
 *    @command git add . && git commit -m "Merge dev into QA and resolve conflicts"
 *    @purpose Record conflict resolutions
 * 8. Push QA
 *    @command git push origin qa
 *    @purpose Update remote QA branch
 * 9. Version Bump
 *    @command npm run release:qa
 *    @purpose Trigger automatic version increment (1.0.0-qa.1 → 1.0.0-qa.2)
 *
 * UAT Branch (uat) Workflow:
 * 10. Update UAT
 *     @command git checkout uat && git pull origin uat
 *     @purpose Ensure UAT is current
 * 11. Merge QA
 *     @command git merge --no-ff qa
 *     @purpose Move tested changes to UAT
 * 12. Handle Conflicts
 *     @action Resolve conflicts manually
 *     @purpose Maintain UAT versioning (1.0.0-uat.x)
 * 13. Push UAT
 *     @command git push origin uat
 *     @purpose Update remote UAT branch
 * 14. Version Bump
 *     @command npm run release:uat
 *     @purpose Update UAT version (1.0.0-uat.1 → 1.0.0-uat.2)
 *
 * Production Branch (main) Workflow:
 * 15. Update Main
 *     @command git checkout main && git pull origin main
 *     @purpose Ensure main branch is current
 * 16. Create PR
 *     @action Use GitHub UI: QA/UAT → main
 *     @purpose Enable code review before production
 * 17. Review & Merge
 *     @action Review changes and merge PR
 *     @purpose Quality control for production code
 * 18. Update Local
 *     @command git pull origin main
 *     @purpose Sync local main branch
 * 19. Version Bump
 *     @command npm run release:prod
 *     @purpose Generate stable version (1.0.0 → 1.0.1)
 *
 * Important Notes:
 * - Always use --no-ff flag for merges to maintain branch history
 * - Resolve conflicts carefully to maintain correct versioning
 * - Run tests after merges to ensure stability
 * - Create PR for main branch merges for better control
 * - Version bumps are automatic based on commit messages
 */
// ==================================================================
// ====================== Jira Ticket Number ======================
// example: jira ticket number: RPAA-156
// url: https://empaxis.atlassian.net/browse/RPAA-156
// ==================================================================
// Commit Message Examples: git commit -m "feat(RPAA-156): add new feature"
// feat(RPAA-156): add new feature
// fix(RPAA-157): fix bug
// chore(RPAA-158): update docs
// refactor(RPAA-159): refactor code
// perf(RPAA-160): improve performance
// test(RPAA-161): add tests
// style(RPAA-162): style code
// docs(RPAA-163): update docs
// ==================================================================
