This folder is for the development of the compiler and only describes internal strucutre.
The order of processing is the following which each component somewhat described:

## 1. Tokenizer
Transforms the text into tokens to ease further procressing.

Input: Text (Full md file contents)
Output: [attr_tokens, main_tokens]

## 2. Parser
Transforms the tokens into a structured tree for traspassing when building.

Input: [attr_tokens, main_tokens]
Output: [parsed_attributes, parsed_tree]

## 3. File_Builder
Transforms attributes and parsed tree into ejs text.

Input: [parsed_attributes, parsed_tree]
Output: ejs code