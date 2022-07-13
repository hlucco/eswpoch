import * as vscode from 'vscode'

type UnitObject = {
    s: number,
    ms: number,
    μs: number,
    ns: number
}

function generateConversions(initialValue: number): string[] {
    const digits = initialValue.toString().length;

    // <= 11 s <= 14 ms <= 16 mcs else ns
    let unit = 's';

    if (digits >= 12) {
        unit = 'ms';
    }

    if (digits >= 15) {
        unit = "μs"
    }

    if (digits >= 17) {
        unit = 'ns'
    }
    
    const conversions: {[key: string] : UnitObject} = {
        s : {
            s : 1,
            ms : 1000,
            μs : 1e6,
            ns : 1e9
        },
        ms : {
            s : 1/1000,
            ms: 1,
            μs: 1000,
            ns: 1e6
        },
        μs: {
            s : 1/1e6,
            ms: 1/1000,
            μs: 1,
            ns: 1000
        },
        ns : {
            s : 1/1e9,
            ms: 1/1e6,
            μs : 1/1000,
            ns: 1
        }
    }

    let result: string[] = [];

    Object.entries(conversions[unit]).forEach((entries: [string, number]) => {
        const convValue = entries[1];
        const convUnit = entries[0];
        result.push(`${convUnit} : ${(initialValue * convValue).toFixed().toString()}`);
    })

    return result;
}

function getToken(line: string, pos: number): string {
    const tokens = line.split(" ");
    let result = "";
    let charIdx = 0;
    for(let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        charIdx += token.length;
        if (charIdx + i >= pos) {
            result = token;
            break;
        }
    }

    return result;
}

export function activate(context: vscode.ExtensionContext) {

    const eswpoch = vscode.commands.registerCommand('eswpoch.epochConvert', async () => {
        
        const editor = vscode.window.activeTextEditor
        if (editor !== undefined) {
            const position = editor.selection.active;

            if (position !== undefined) {
                let selectedLine = editor.document.lineAt(position)
                const lineText = selectedLine.text || ""
                const valueString = getToken(lineText, position.character)
                const value = parseInt(valueString)

                if (value.toString() === "NaN") {
                    vscode.window.showErrorMessage("Not a valid timestamp", {
                        detail: "Must be used on a valid utc timestamp."
                    });
                    return
                }

                const startIdx = lineText.indexOf(valueString)

                if (value !== undefined) {
                    const options = generateConversions(value);
                    const valueMS = parseInt((options[1].split(":")[1] || valueString).trim())
                    const readableTime = new Date(valueMS).toUTCString()

                    const result = await vscode.window.showQuickPick(options, {
                        placeHolder: readableTime,
                        title: "Epoch Converter"
                    }) || ""

                    const insertValue = (result.split(":")[1] || valueString).trim()
                    const anchor = new vscode.Position(selectedLine.lineNumber, startIdx)
                    const active = new vscode.Position(selectedLine.lineNumber, startIdx + valueString.length)
                    const selection = new vscode.Selection(anchor, active)

                    editor.edit(editorBuilder => {
                        editorBuilder.replace(selection, insertValue)
                    })
                }
            }
        }

    });

    context.subscriptions.push(eswpoch);
}