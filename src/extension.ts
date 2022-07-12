import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {

    console.log("extension has been activated");

	const disposable = vscode.commands.registerCommand('extension.epochConvert', () => {

        // Specification:
        // on key press or activation of the command ctrl+alt+e
        // the quick pick will open and it will display the detected timestamp value in
        // the user input bar, and then all of the options will be the supported conversions
        // for that timestamp for example if the hot key is pressed on a ns timestamp, then
        // the s, ms, mms, m, h, and normal date time string options will all appear for 
        // that input ts. the user can then either press enter right away to close the
        // quick pick and change nothing, or cycle through the options and press enter on
        // one of them to cycle out the values (ie selected conversion goes inline where
        // the old input value was)
        
        vscode.window.showQuickPick(["ms: 1657606717", "ns: 165760671700000", "s: 164504"])
        vscode.window.showInformationMessage("this is still here for now")

	});

    const epochProvider = vscode.languages.registerCompletionItemProvider('python', {

        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

            // starting small
            const simpleCompletion = new vscode.CompletionItem('Hello World');

            return [
                simpleCompletion
            ]
        }

    })

    context.subscriptions.push(disposable, epochProvider);
}