import * as vscode from 'vscode';

/**
 * Returns the line comment token for supported languages.
 * Returns null if the language is not supported.
 */
function getLineCommentForLanguage(languageId: string): string | null {
    const map: Record<string, string> = {
        'javascript': '//',
        'typescript': '//',
        'jsonc': '//',
        'java': '//',
        'c': '//',
        'cpp': '//',
        'csharp': '//',
        'go': '//',
        'rust': '//',
        'python': '#',
        'ruby': '#',
        'shellscript': '#',
        'perl': '#',
        'r': '#',
        'makefile': '#',
        'dockerfile': '#',
        'yaml': '#',
        'toml': '#',
        'ini': ';',
        'sql': '--',
        'lua': '--',
        'powershell': '#',
        'php': '//',
        'kotlin': '//',
        'swift': '//',
        'scala': '//'
    };

    return map[languageId] || null;
}

/**
 * Inserts or updates a path comment on the first line of the file.
 * Ensures there's a blank line after it.
 */
function updatePathComment(doc: vscode.TextDocument) {
    if (doc.isUntitled || doc.uri.scheme !== 'file') return;

    const commentPrefix = getLineCommentForLanguage(doc.languageId);
    if (!commentPrefix) return;

    const relativePath = vscode.workspace.asRelativePath(doc.uri);
    const comment = `${commentPrefix} ${relativePath}`;
    const firstLine = doc.lineAt(0).text;

    const edit = new vscode.WorkspaceEdit();

    if (firstLine.startsWith(commentPrefix)) {
        edit.replace(doc.uri, doc.lineAt(0).range, comment);

        if (doc.lineCount > 1 && doc.lineAt(1).text.trim() !== '') {
            edit.insert(doc.uri, new vscode.Position(1, 0), '\n');
        }
    } else {
        edit.insert(doc.uri, new vscode.Position(0, 0), comment + '\n\n');
    }

    vscode.workspace.applyEdit(edit);
}

/**
 * Registers listeners and command for the extension.
 */
export function activate(context: vscode.ExtensionContext) {
    const onOpen = vscode.workspace.onDidOpenTextDocument(updatePathComment);
    const onSave = vscode.workspace.onDidSaveTextDocument(updatePathComment);

    const command = vscode.commands.registerCommand('extension.insertPathComment', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            updatePathComment(editor.document);
        }
    });

    context.subscriptions.push(onOpen, onSave, command);
}

export function deactivate() {}