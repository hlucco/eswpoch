# Eswpoch

Brings up a quick pick menu which allows swapping between units and human readable strings of a configurable set of timezones for a given timestamp. Created to reduce my daily total of visits to [https://epochconverter.com](https://epochconverter.com).

## Example

![example gif](https://raw.githubusercontent.com/hlucco/eswpoch/master/example.gif)

## Default Keybindings

`ctrl + alt + e` ---> `eswpoch.epochConvert`

`ctrl + alt + t` ---> `eswopch.addTimezone`

## Overview

Once the cursor is over a valid timestamp value, on key press of the keybinding or activation of the `eswpoch.epochConvert` command the menu will open and display the detected timestamp value in the user input bar. The options will be the supported conversations for that timestamp. Exit the menu and change nothing or cycle through the options and select one to cycle out. The old value will be replaced with the new value converted in line.

In addition to unit conversions, the menu will also show a converted human readable string for all of the IANA time zones that have been added to the workspace's `settings.json`. Selecting one of these strings will swap the original value for the selected human readable string. To add time zones without modifying the `settings.json`, the `eswopch.addTimezone` command will bring up an input menu that will allow input of any valid IANA timezone value.

## Configuration

To add or remove time zone options from the menu, open the `settings.json` for your workspace and insert or delete the desired timezones from the `eswpoch.timezones` field. 

```json
"eswpoch.timezones": [
    "America/Los_Angeles",
    "America/New_York",
    "America/Chicago"
]
```

To configure keybindings add a new object to your `keybindings.json` modifying your selected command.
```json
{
    "command": "eswpoch.addTimezone",
    "key" : "ctrl+alt+t"
}
```

Neovim port: https://github.com/hlucco/nvim-eswpoch

Version 1.0.1
