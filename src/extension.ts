import * as vscode from 'vscode';
import { getFlagFromISO, iso2toName, iso3to2 } from './country-codes';

let activeEditor: vscode.TextEditor | undefined;
let decorations: vscode.TextEditorDecorationType[] = [];

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    const supportedLanguages = ['json', 'javascript', 'typescript', 'plaintext', 'markdown', 'python', 'csv'];

    activeEditor = vscode.window.activeTextEditor;

    // Update decorations when the active editor changes
    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            updateDecorations();
        }
    }, null, context.subscriptions);

    // Update decorations when the document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            updateDecorations();
        }
    }, null, context.subscriptions);

    // Register hover provider for supported languages
    supportedLanguages.forEach(language => {
        context.subscriptions.push(
            vscode.languages.registerHoverProvider(language, {
                provideHover(document, position) {
                    const range = document.getWordRangeAtPosition(position, /\b([A-Z]{2,3})\b/);
                    if (range) {
                        const word = document.getText(range);
                        let countryCode = word;
                        let countryName = null;

                        // Convert alpha-3 to alpha-2 if needed
                        if (word.length === 3 && iso3to2[word]) {
                            countryCode = iso3to2[word];
                        }

                        // Get country name if code is valid
                        if (countryCode.length === 2 && iso2toName[countryCode]) {
                            countryName = iso2toName[countryCode];
                            const flag = getFlagFromISO(word);
                            return new vscode.Hover(`${countryName} ${flag || ''}`);
                        }
                    }
                    return null;
                }
            })
        );
    });

    // Initial update of decorations
    if (activeEditor) {
        updateDecorations();
    }

    function updateDecorations() {
        if (!activeEditor) return;

        // Clear previous decorations
        clearDecorations();

        const document = activeEditor.document;
        const languageId = document.languageId;

        // Only process supported languages
        if (!supportedLanguages.includes(languageId)) {
            return;
        }

        const text = document.getText();

        // Find alpha2 codes
        const alpha2Regex = /\b([A-Z]{2})\b/g;
        let match;
        while ((match = alpha2Regex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            const countryCode = match[1];
            const emoji = getFlagFromISO(countryCode);

            if (emoji) {
                addDecoration(range, emoji);
            }
        }

        // Find alpha3 codes
        const alpha3Regex = /\b([A-Z]{3})\b/g;
        while ((match = alpha3Regex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            const countryCode = match[1];
            const emoji = getFlagFromISO(countryCode);

            if (emoji) {
                addDecoration(range, emoji);
            }
        }
    }

    function addDecoration(range: vscode.Range, emoji: string) {
        const decoration = vscode.window.createTextEditorDecorationType({
            after: {
                contentText: ` ${emoji}`,
                color: 'rgba(153, 153, 153, 0.8)'
            }
        });

        activeEditor?.setDecorations(decoration, [range]);
        decorations.push(decoration);
    }

    function clearDecorations() {
        decorations.forEach(decoration => decoration.dispose());
        decorations = [];
    }
}

// This method is called when your extension is deactivated
export function deactivate() {
    // Clean up decorations
    decorations.forEach(decoration => decoration.dispose());
    decorations = [];
}
