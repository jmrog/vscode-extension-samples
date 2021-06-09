import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite('Should do hover', () => {
	const docUri = getDocUri('diagnostics.txt');

	test('Provides hover results on simulating hover', async () => {
		await testHover(docUri, new vscode.Position(0, 0));
	});
});

async function testHover(
	docUri: vscode.Uri,
	position: vscode.Position
) {
	await activate(docUri);

	// Executing the command `vscode.executeHoverProvider` to simulate triggering hover
	const actualHoverHelp = (await vscode.commands.executeCommand(
		'vscode.executeHoverProvider',
		docUri,
		position
	)) as vscode.Hover[];

	const { contents } = actualHoverHelp[0];
	assert.equal(
		typeof contents[0] === 'string' ? contents[0] : contents[0].value, 'foo'
	);
}
