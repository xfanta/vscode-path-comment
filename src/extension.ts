import * as vscode from 'vscode';

function getLineCommentForLanguage(languageId: string): string | null {
    const map: Record<string, string> = {
        'javascript': '//',
        'typescript': '//',
        'javascriptreact': '//',
        'typescriptreact': '//',
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
