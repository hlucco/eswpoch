import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {

    console.log("extension has been activated");

	const eswpoch = vscode.commands.registerCommand('extension.epochConvert', () => {

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
        
        const position = vscode.window.activeTextEditor?.selection.active;
        if (position !== undefined) {
            const value = vscode.window.activeTextEditor?.document.lineAt(position)

            if (value !== undefined) {
                const options = ["a", "b", "c"]
                const result = vscode.window.showQuickPick(options, {
                    placeHolder: value.text,
                })
            }
            
        }

	});

    context.subscriptions.push(eswpoch);
}