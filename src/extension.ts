// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getFlagFromISO } from './country-codes';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const supportedLanguages = ['json', 'javascript', 'typescript', 'plaintext', 'markdown', 'python'];
    supportedLanguages.forEach(language => {
        const disposable = vscode.languages.registerHoverProvider(language, {
            provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | null {
                // Match both 2-letter and 3-letter country codes
                const alpha3Range = document.getWordRangeAtPosition(position, /[A-Z]{3}/);
                const alpha2Range = document.getWordRangeAtPosition(position, /[A-Z]{2}/);
                let emoji: string | null = null;
                let range: vscode.Range | undefined;

                // Check alpha-3 code first
                if (alpha3Range) {
                    const countryCode = document.getText(alpha3Range);
                    emoji = getFlagFromISO(countryCode);
                    if (emoji) {
                        range = alpha3Range;
                    }
                }

                // Then check alpha-2 code if no alpha-3 match
                if (!emoji && alpha2Range) {
                    const countryCode = document.getText(alpha2Range);
                    emoji = getFlagFromISO(countryCode);
                    if (emoji) {
                        range = alpha2Range;
                    }
                }

                if (emoji && range) {
                    const content = new vscode.MarkdownString();
                    content.isTrusted = true;
                    content.appendMarkdown(`${emoji}`);
                    return new vscode.Hover(content, range);
                }
                return null;
            }
        });
        context.subscriptions.push(disposable);
    });
}

// This method is called when your extension is deactivated
export function deactivate() { }
