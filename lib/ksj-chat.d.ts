/* Types for lib/ksj-chat.js.
 *
 * The widget is a side-effect script that attaches KSJChat to window, and it exports
 * nothing, so TypeScript will not treat it as a module on its own. It is imported for
 * that side effect only; the callable surface is declared on Window in ResearchChat.tsx.
 *
 * The declaration lives here rather than in the .js file because the same file is served
 * verbatim to kangseongjun.com, where it loads through a plain <script> tag that cannot
 * parse an export statement.
 */

export {};
