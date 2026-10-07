/**
 * Copyright (c) 2006-2024, JGraph Holdings Ltd
 * Copyright (c) 2006-2024, draw.io AG
 */

/*
 * Modified 2026-10-02 by baisongcode (unofficial DeepSeek fork,
 * https://github.com/baisongcode/drawio-desktop): presets DeepSeek as the AI
 * provider through DRAWIO_CONFIG below, reusing the OpenAI-compatible "gpt"
 * configuration.
 */

// Overrides of global vars need to be pre-loaded
window.DRAWIO_PUBLIC_BUILD = true;
window.EXPORT_URL = null; // Replace with the URL of your export server to enable server-side PDF and image export, e.g. https://www.example.com/export. With null, export to PDF uses the print dialog
window.DRAWIO_BASE_URL = null; // Replace with path to base of deployment, e.g. https://www.example.com/folder
window.DRAWIO_VIEWER_URL = null; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
window.DRAWIO_LIGHTBOX_URL = null; // Replace with your lightbox URL, eg. https://www.example.com
window.DRAW_MATH_URL = 'math4/es5';
// DeepSeek AI preset (this fork). draw.io ships AI providers for OpenAI,
// Gemini and Claude only, so the OpenAI-compatible "gpt" provider is pointed at
// the DeepSeek endpoint and the model list is replaced with the DeepSeek
// models. The host must also be listed in connect-src by every active Content
// Security Policy: src/main/electron.js, js/bootstrap.js and
// js/diagramly/ElectronApp.js (all patched in this fork).
//
// gptUrl accepts the base_url from the providers' documentation
// (https://api.deepseek.com) or a full endpoint URL: a base URL (no path, or
// only a version segment such as https://api.openai.com/v1) gets the endpoint
// path of the configured API style appended (see Editor.normalizeAiEndpoint),
// anything else is used verbatim. gptStyle selects the style and defaults to
// 'chat' (POST /chat/completions, {model, messages}); 'responses' uses the
// OpenAI Responses API (POST /responses, {model, instructions, input}).
//
// Thinking mode defaults to enabled on DeepSeek's side (thinking.type defaults
// to "enabled"), so responses take longer than non-thinking mode; draw.io gives
// a request 90s (Editor.prototype.generateTimeout), which a long thinking
// generation can exceed. Non-thinking mode can be selected with a custom
// aiConfigs entry that adds "thinking": {"type": "disabled"} to the request.
//
// Set your key below (https://platform.deepseek.com/api_keys). gptApiKey is
// what makes the models appear in the Generate dialog's model selector: only
// models whose aiConfigs[..].apiKey entry is non-null are offered (Dialogs.js).
// The model names and endpoint are the ones the DeepSeek docs list for
// POST /chat/completions.
//
// A Configuration saved in Extras > Configuration (localStorage) is applied
// after this global and overrides the same keys, so leave that empty or merge
// the values there instead.
window.DRAWIO_DEEPSEEK_API_KEY = 'sk-YOUR-KEY';

window.DRAWIO_CONFIG = {
	enableAi: true,
	gptApiKey: window.DRAWIO_DEEPSEEK_API_KEY,
	gptUrl: 'https://api.deepseek.com',
	gptStyle: 'chat',
	aiModels: [
		{name: 'DeepSeek Flash', model: 'deepseek-flash', config: 'gpt'},
		{name: 'DeepSeek V4 Pro', model: 'deepseek-v4-pro', config: 'gpt'}
	]
}; // Replace with your custom draw.io configurations. For more details, https://www.drawio.com/doc/faq/configure-diagram-editor
urlParams['sync'] = 'manual';
