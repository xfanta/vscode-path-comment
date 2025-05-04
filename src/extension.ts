import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.workspace.onWillSaveTextDocument(event => {
        const doc = event.document;
        const relativePath = vscode.workspace.asRelativePath(doc.uri);
        const comment = `// ${relativePath}`;

        const firstLine = doc.lineAt(0).text;
        const edit = new vscode.WorkspaceEdit();

        if (firstLine.startsWith('// ')) {
            // Update existing path comment
            edit.replace(doc.uri, doc.lineAt(0).range, comment);
        } else {
            // Insert new path comment at the top
            edit.insert(doc.uri, new vscode.Position(0, 0), comment + '\\n');
        }

        vscode.workspace.applyEdit(edit);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
