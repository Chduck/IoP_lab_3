import * as vscode from 'vscode';

/**
 * Transforms string to PascalCase.
 * @param {string} str - Initial string.
 * @returns {string} Transformed string.
 * @example '_pascal_case' -> 'PascalCase'
 */
function toPascalCase(str: string): string{
	return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^[a-z]/, first_chr => first_chr.toUpperCase());
} 

/**
 * Transforms string to snake_case.
 * @param {string} str - Initial string.
 * @returns {string} Transformed string.
 * @example 'SnakeCase' -> 'snake_case'
 */
function toSnakeCase(str: string): string{
	return str.replace(/[A-Z]/g, chr => '_' + chr.toLowerCase()).replace(/^_/, '').replace(/[^a-zA-Z0-9]/g, (chr) => '_').replace(/[_][_]+/g, '_');
}

/**
* Motivational phrase is randomly chosen and shown in a modal information message.
*/
export function handleMotivateCommand(): void {
	//Motivational phrases to choose from.
	const phrases: string[] = ["When it is dark enough, you can see the stars.", "The world is round and the place which may seem like the end may also be only the beginning.", "It is not the mountain we conquer but ourselves.", "I have sometimes been wildly, despairingly, acutely miserable, but through it all I still know quite certainly that just to be alive is a grand thing.","Perhaps everything terrible is in its deepest being something helpless that wants help from us.", "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying: I will try again tomorrow.", 
	"Strength does not come from physical capacity. It comes from an indomitable will.", "In the depth of winter, I finally learned that within me there lay an invincible summer.", "Be miserable. Or motivate yourself. Whatever has to be done, it's always your choice.", "Some people believe holding on and hanging in there are signs of great strength. However, there are times when it takes much more strength to know when to let go and then do it.", "Where there is no struggle, there is no strength", "That which does not kill us makes us stronger.",
	"Make up your mind that no matter what comes your way, no matter how difficult, no matter how unfair, you will do more than simply survive. You will thrive in spite of it.", "Man can live about forty days without food, about three days without water, about eight minutes without air, but only for one second without hope", "Inside of a ring or out, ain't nothing wrong with going down. It's staying down that's wrong.", "In times of great stress or adversity, it's always best to keep busy, to plow your anger and your energy into something positive.",
	"You have power over your mind - not outside events. Realize this, and you will find strength.", "At any given moment you have the power to say: This is not how the story is going to end.", "With the new day comes new strength and new thoughts.", "Adversity is like a strong wind. It tears away from us all but the things that cannot be torn, so that we see ourselves as we really are.", "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face. You are able to say to yourself:I lived through this horror. I can take the next thing that comes along.",
	"The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.", "When you come to the end of your rope, tie a knot and hang on.", "Anyone can give up, it's the easiest thing in the world to do. But to hold it together when everyone else would understand if you fell apart, that's true strength.",
	"I am not a product of circumstances. I am a product of my decisions.", "Life is not about how fast you run or how high you climb but how well you bounce.", "Dealing with it is the operative word. I found myself at seven years not battling it. Not struggling with it. Not suffering from it. Not breaking under the burden of it, but dealing with it.", "Hope is being able to see that there is light despite all of the darkness.", "I don't think of all the misery, but of the beauty that still remains.",
	"I am fundamentally an optimist. Whether that comes from nature or nurture, I cannot say. Part of being optimistic is keeping one's head pointed toward the sun, one's feet moving forward.", "To live without hope is to cease to live.", "You don't drown by falling in the water, you drown by staying there.", "Promise me you'll always remember: You're braver than you believe, and stronger than you seem, and smarter than you think.", "Hope is important because it can make the present moment less difficult to bear. If we believe that tomorrow will be better, we can bear a hardship today.",
	"Scared and sacred are spelled with the same letters. Awful proceeds from the same root word as awesome. Terrify and terrific. Every negative experience holds the seed of transformation.", "And once the storm is over, you won't remember how you made it through, how you managed to survive. You won't even be sure whether the storm is really over. But one thing is certain. When you come out of the storm, you won't be the same person who walked in. That's what this storm's all about.", "There are far, far better things ahead than anything we leave behind.", "What the caterpillar calls the end of the world, the master calls a butterfly.",
	"The sun always comes up. Spring always comes after winter. The river always reach the ocean. Always.", "The trick is in what one emphasizes. We either make ourselves miserable, or we make ourselves happy. The amount of work is the same.", "It's not what happens to you, but how you react to it that matters.", "It is not the strongest or the most intelligent who will survive but those who can best manage change.",
	"Sometimes good things fall apart so better things can fall together.", "I am determined to be cheerful and happy in whatever situation I may find myself. For I have learned that the greater part of our misery or unhappiness is determined not by our circumstance but by our disposition.", "When we are no longer able to change a situation, we are challenged to change ourselves.", "No one knows enough to be a pessimist.",
	"Always say yes to the present moment. What could be more futile, more insane, than to create inner resistance to what already is? What could be more insane than to oppose life itself, which is now and always now? Surrender to what is. Say yes to life — and see how life suddenly starts working for you rather than against you.", "When you come to the edge of all that you know, you must believe one of two things: there will be ground to stand on… or you will grow wings to fly.",
	"It only goes up after you hit rock bottom.", "The elevator to success is out of order. You’ll have to use the stairs, one step at a time.", "People say nothing is impossible, but I do nothing every day.", "Work until your bank account looks like a phone number.", "If you think you are too small to make a difference, try sleeping with a mosquito.", "Don’t worry about the world coming to an end today. It’s already tomorrow in New Zealand.", "Think like a proton. Always positive.", "If you let your head get too big, it’ll break your neck.;)",
	"A diamond is merely a lump of coal that did well under pressure.", "Nothing is impossible, the word itself says “I’m possible!"];
	const max: number = 57;

	let motivational_phrase_id: number = Math.floor(Math.random() * (max + 1));
	let motivational_phrase = phrases[motivational_phrase_id];

	vscode.window.showInformationMessage(motivational_phrase, {modal: true});
}

/**
 * Renames variables and structs/classes/unions in the active document according to Google Code C++ Style: snake_case and PascalCase respectfully.
 */
export function handleGoogleStyleCommand(): void {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	};
    const document = editor.document;
    const text = document.getText();
	let match;
	const renameMap = new Map<string, string>();

	editor.edit(editBuilder => {
        let updatedText = text;
        const classRegex = /\b(class|struct|union)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
        const defaultTypeNames: string[] = ['bool', 'int', 'double', 'float', 'char', 'auto', 'std::string', 'size_t', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'long', 'short'];
		const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

		//Creating map for classes' names and updating possible variables types. 
		while ((match = classRegex.exec(text)) !== null) {
            renameMap.set(match[2], toPascalCase(match[2]));
			defaultTypeNames.push(match[2]);
        }

		const typeNamesText = defaultTypeNames.join('|');
		const varRegex = new RegExp(`\\b(${typeNamesText})([*\\s]+)([a-zA-Z_][a-zA-Z0-9_]*)\\b`, 'g');

		//Making map for variables' names.
		while ((match = varRegex.exec(text)) !== null) {
			renameMap.set(match[3], toSnakeCase(match[3]));
        }

		//Replacing names of classes and variables with right names according to Google C++ Style.
		for (const [oldName, newName] of renameMap.entries()) {
            if (oldName === newName) {continue;}
            const globalWordRegex = new RegExp(`\\b${oldName}\\b`, 'g');
                
            updatedText = updatedText.replace(globalWordRegex, newName);
        }

        editBuilder.replace(fullRange, updatedText);
    });
}

/**
 * Called automatically when the extension is started, registers commands and adds them to context subscriptions.
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code for managing lifecycle and resources.
 */
export function activate(context: vscode.ExtensionContext) {
	const Motivate = vscode.commands.registerCommand('google-motivator.motivate', handleMotivateCommand);
	const GoogleStyleNaming = vscode.commands.registerCommand('google-motivator.googlestylenaming', handleGoogleStyleCommand);

	context.subscriptions.push(GoogleStyleNaming);
	context.subscriptions.push(Motivate);
}

/**
 * Called automatically by VS Code when the extension is deactivated.
 */
export function deactivate() {}
