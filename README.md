# README

A small VS Code extension that adds two commands: `Motivate` to cheer you up, and `Google Style Naming` to automatically rename identifiers in your C++ code according to the [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html). 

> [!NOTE]
> This extension does not change code style fully, it only changes identifiers' names.

>[!WARNING]
>This extension does not support constants and special rules of naming applyed to private fields. 

## Features

### 1. `Motivate` - Make a motivational phrase appear

Shows a random motivational phrase in a modal information message.

**How to use:**

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run **Motivate**.

A modal dialog with a random phrase appears. Close it to continue working.

### 2. `Google Style Naming` - Change identifires' names so they follow Google C++ Style

Rewrites identifiers in the **active document** to follow the Google C++
naming conventions:

| Kind            | Style        | Example                          |
|-----------------|--------------|----------------------------------|
| Type names      | `PascalCase` | `my_class` -> `MyClass`          |
| Variable names  | `snake_case` | `myVariable` -> `my_variable`    |

**How it works:**

1. Finds all `class`, `struct`, and `union` declarations and renames them to `PascalCase`.
2. Collects a list of types consisting of built-in types (`bool`, `int`, `long`, `short`, `double`, `float`, `char`, `auto`, `std::string`, `size_t`, `int8_t`…`int64_t`) and the user-defined types found in step 1.
3. Finds variable declarations of those types and renames the variables to `snake_case`.
4. Applies all renamings globally across the document in a single edit.

**How to use:**

1. Open a C/C++ file in the editor.
2. Open the Command Palette (`Ctrl+Shift+P`).
3. Run **Google Style Naming**.

## Requirements

VS Code version **1.103.x** or newer.

## Author

Yudin Andrew Valerievich (Юдин Андрей Валерьевич) from group M3105 
