// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	commands,
	ConfigurationScope,
	Disposable,
	DocumentFormattingEditProvider,
	languages,
	LanguageStatusItem,
	LogOutputChannel,
	Uri,
	window,
	workspace,
	WorkspaceConfiguration,
	WorkspaceFolder,
} from "vscode";
import { DocumentSelector } from "vscode-languageclient";

export function createOutputChannel(name: string): LogOutputChannel {
	return window.createOutputChannel(name, { log: true });
}

export function getConfiguration(
	config: string,
	scope?: ConfigurationScope,
): WorkspaceConfiguration {
	return workspace.getConfiguration(config, scope);
}

export function registerCommand(
	command: string,
	callback: (...args: any[]) => any,
	thisArg?: any,
): Disposable {
	return commands.registerCommand(command, callback, thisArg);
}

export const { onDidChangeConfiguration } = workspace;

export function isVirtualWorkspace(): boolean {
	const isVirtual =
		workspace.workspaceFolders &&
		workspace.workspaceFolders.every((f) => f.uri.scheme !== "file");
	return !!isVirtual;
}

export function getWorkspaceFolders(): readonly WorkspaceFolder[] {
	return workspace.workspaceFolders ?? [];
}

export function getWorkspaceFolder(uri: Uri): WorkspaceFolder | undefined {
	return workspace.getWorkspaceFolder(uri);
}

export function registerDocumentFormattingEditProvider(
	selector: DocumentSelector,
	provider: DocumentFormattingEditProvider,
): Disposable {
	return languages.registerDocumentFormattingEditProvider(selector, provider);
}

export function createLanguageStatusItem(
	id: string,
	selector: DocumentSelector,
): LanguageStatusItem {
	return languages.createLanguageStatusItem(id, selector);
}

export function getDocumentSelector(): DocumentSelector {
	return isVirtualWorkspace()
		? [{ language: "python" }]
		: [
				{ scheme: "file", language: "python" },
				{ scheme: "untitled", language: "python" },
				{ scheme: "vscode-notebook", language: "python" },
				{ scheme: "vscode-notebook-cell", language: "python" },
			];
}
