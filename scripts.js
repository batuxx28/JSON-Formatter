
class FormatterApp {
    constructor() {
        this.currentFormat = 'json';
        this.lastOutputText = '';
        this.lastOutputFormat = null;
        this.lastInputLineCount = 0;
        this.userLocale = this.detectUserLocale();
        this.translations = this.getTranslations();
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
        this.updateUILanguage();
    }

    detectUserLocale() {
        const browserLang = navigator.language || 'es-ES';
        let timezone = '';

        try {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (error) {
            timezone = 'UTC';
        }

        const timezoneToLocale = {
            'America/Lima': 'es-PE',
            'America/Mexico_City': 'es-MX',
            'America/Buenos_Aires': 'es-AR',
            'Europe/Madrid': 'es-ES',
            'America/New_York': 'en-US',
            'America/Sao_Paulo': 'pt-BR'
        };

        return timezoneToLocale[timezone] || browserLang;
    }

    getTranslations() {
        return {
            es: {
                title: 'Formateador JSON/XML',
                subtitle: 'Formatea, valida y exporta tus datos estructurados con estilo',
                inputHeader: 'Entrada - Pega tu c\u00f3digo aqu\u00ed',
                outputHeader: 'Salida - Resultado formateado',
                format: 'Formatear',
                validate: 'Validar',
                minify: 'Minificar',
                clear: 'Limpiar',
                copy: 'Copiar',
                copied: 'Copiado',
                export: 'Exportar',
                exportJson: 'Exportar como JSON',
                exportXml: 'Exportar como XML',
                exportExcel: 'Exportar como Excel',
                exportCsv: 'Exportar como CSV',
                characters: 'Caracteres',
                lines: 'L\u00edneas',
                size: 'Tama\u00f1o',
                ready: 'Listo para formatear',
                jsonPlaceholder: 'Pega tu JSON aqu\u00ed...\n\nEjemplo:\n{\n  "nombre": "Juan",\n  "edad": 30,\n  "ciudad": "Lima"\n}',
                xmlPlaceholder: 'Pega tu XML aqu\u00ed...\n\nEjemplo:\n<persona>\n  <nombre>Juan</nombre>\n  <edad>30</edad>\n  <ciudad>Lima</ciudad>\n</persona>',
                resultPlaceholder: 'El resultado aparecer\u00e1 aqu\u00ed...',
                formatSuccess: 'Formateado correctamente',
                validJson: 'JSON v\u00e1lido',
                validXml: 'XML v\u00e1lido',
                invalidData: 'Datos inv\u00e1lidos',
                minifySuccess: 'Minificado correctamente',
                dataCleared: 'Datos limpiados',
                exportSuccess: 'Exportado como',
                errorPrefix: 'Error',
                noDataToValidate: 'No hay datos para validar',
                noDataToMinify: 'No hay datos para minificar',
                noDataToExport: 'No hay datos para exportar',
                jsonError: 'Revisa la estructura del JSON',
                xmlError: 'Revisa la estructura del XML',
                pageTitle: 'JSON/XML Formatter & Exporter',
                metaTitle: 'JSON/XML Formatter & Exporter',
                metaDescription: 'Formatea, valida y exporta datos JSON y XML en segundos con resultados limpios y opciones de exportaci\u00f3n.',
                metaKeywords: 'formateador json, formateador xml, validador json, validador xml, exportar json, exportar xml',
                ogDescription: 'Formatea, valida y exporta datos JSON y XML desde tu navegador sin enviar nada a servidores.',
                twitterDescription: 'Formatea, valida y exporta datos JSON y XML directamente en el navegador.',
                faqTitle: 'Preguntas frecuentes',
                faqQuestion1: '\u00bfEsta web almacena datos?',
                faqAnswer1: 'No, toda la l\u00f3gica corre en tu navegador; no tocamos servidores ni guardamos informaci\u00f3n.',
                faqQuestion2: '\u00bfPuedo ver el c\u00f3digo fuente?',
                faqAnswer2: 'Claro, la aplicaci\u00f3n es 100% est\u00e1tica. Puedes descargarla y revisarla sin restricciones.',
                faqQuestion3: '\u00bfEspero cobrar algo por esto?',
                faqAnswer3: 'Quiz\u00e1 m\u00e1s adelante incorpore alg\u00fan anuncio, pero hoy el uso es totalmente gratuito.',
                faqQuestion4: '\u00bfPor qu\u00e9 se realiz\u00f3 esta web?',
                faqAnswer4: 'Naci\u00f3 de la urgencia por formatear JSON y XML de forma r\u00e1pida sin instalar nada.',
                faqQuestion5: '\u00bfSe har\u00e1n nuevas mejoras?',
                faqAnswer5: 'S\u00ed, el plan es seguir puliendo la herramienta y sumar funciones \u00fatiles.'
            },
            en: {
                title: 'JSON/XML Formatter',
                subtitle: 'Format, validate and export your structured data with style',
                inputHeader: 'Input - Paste your code here',
                outputHeader: 'Output - Formatted result',
                format: 'Format',
                validate: 'Validate',
                minify: 'Minify',
                clear: 'Clear',
                copy: 'Copy',
                copied: 'Copied',
                export: 'Export',
                exportJson: 'Export as JSON',
                exportXml: 'Export as XML',
                exportExcel: 'Export as Excel',
                exportCsv: 'Export as CSV',
                characters: 'Characters',
                lines: 'Lines',
                size: 'Size',
                ready: 'Ready to format',
                jsonPlaceholder: 'Paste your JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}',
                xmlPlaceholder: 'Paste your XML here...\n\nExample:\n<person>\n  <name>John</name>\n  <age>30</age>\n  <city>New York</city>\n</person>',
                resultPlaceholder: 'Result will appear here...',
                formatSuccess: 'Formatted successfully',
                validJson: 'Valid JSON',
                validXml: 'Valid XML',
                invalidData: 'Invalid data',
                minifySuccess: 'Minified successfully',
                dataCleared: 'Data cleared',
                exportSuccess: 'Exported as',
                errorPrefix: 'Error',
                noDataToValidate: 'No data to validate',
                noDataToMinify: 'No data to minify',
                noDataToExport: 'No data to export',
                jsonError: 'Check JSON structure',
                xmlError: 'Check XML structure',
                pageTitle: 'JSON/XML Formatter & Exporter',
                metaTitle: 'JSON/XML Formatter & Exporter',
                metaDescription: 'Format, validate, and export JSON and XML data in seconds with clean output and export options.',
                metaKeywords: 'json formatter, xml formatter, json validator, xml validator, export json, export xml',
                ogDescription: 'Format, validate, and export JSON or XML right in your browser without sending data to servers.',
                twitterDescription: 'Format, validate, and export JSON and XML instantly in the browser.',
                faqTitle: 'Frequently Asked Questions',
                faqQuestion1: 'Does this site store my data?',
                faqAnswer1: 'No, everything runs locally in your browser; we do not touch servers or save information.',
                faqQuestion2: 'Can I inspect the source code?',
                faqAnswer2: 'Absolutely. The app is 100% static so you can download and review it without restrictions.',
                faqQuestion3: 'Will you charge for this tool?',
                faqAnswer3: 'Maybe advertising will arrive someday, but right now the tool is completely free to use.',
                faqQuestion4: 'Why was this site created?',
                faqAnswer4: 'It came from the need to format JSON and XML quickly without installing extra software.',
                faqQuestion5: 'Are new improvements coming?',
                faqAnswer5: 'Yes, the plan is to keep refining the tool and shipping useful features.'
            }
        };
    }
    getCurrentLanguage() {
        const locale = this.userLocale.toLowerCase();
        if (locale.startsWith('es')) {
            return 'es';
        }
        return 'en';
    }

    t(key) {
        const lang = this.getCurrentLanguage();
        const fallback = this.translations.en[key] || key;
        return (this.translations[lang] && this.translations[lang][key]) || fallback;
    }

    initializeElements() {
        this.inputEditor = document.getElementById('inputEditor');
        this.inputLineNumbers = document.getElementById('inputLineNumbers');
        this.outputEditor = document.getElementById('outputEditor');
        this.formatBtn = document.getElementById('formatBtn');
        this.validateBtn = document.getElementById('validateBtn');
        this.minifyBtn = document.getElementById('minifyBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.exportMenu = document.getElementById('exportMenu');
        this.copyBtn = document.getElementById('copyBtn');
        this.copyIconPath = this.copyBtn.querySelector('path');
        this.statusMessage = document.getElementById('statusMessage');
        this.charCount = document.getElementById('charCount');
        this.lineCount = document.getElementById('lineCount');
        this.sizeInfo = document.getElementById('sizeInfo');
        this.faqTitle = document.getElementById('faqTitle');
        this.faqQuestions = document.querySelectorAll('[data-faq-question]');
        this.faqAnswers = document.querySelectorAll('[data-faq-answer]');
        this.metaTags = {
            description: document.querySelector('meta[name="description"]'),
            keywords: document.querySelector('meta[name="keywords"]'),
            ogTitle: document.querySelector('meta[property="og:title"]'),
            ogDescription: document.querySelector('meta[property="og:description"]'),
            twitterTitle: document.querySelector('meta[name="twitter:title"]'),
            twitterDescription: document.querySelector('meta[name="twitter:description"]')
        };
        this.structuredData = document.getElementById('structuredData');
        this.rootElement = document.documentElement;

        this.copyIcons = {
            default: 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11z',
            success: 'M9 16.2l-3.2-3.2L4 14l5 5L20 8.1l-1.4-1.4z'
        };
    }

    setOutputContent(text, format, options = {}) {
        const { highlight = false } = options;
        const hasText = Boolean(text);

        this.lastOutputText = hasText ? text : '';
        this.lastOutputFormat = hasText ? format : null;

        if (!hasText) {
            this.outputEditor.innerHTML = '';
            this.outputEditor.classList.remove('is-highlighted');
            return;
        }

        if (highlight) {
            this.outputEditor.classList.add('is-highlighted');
            this.outputEditor.innerHTML = this.highlightJSON(text);
        } else {
            this.outputEditor.classList.remove('is-highlighted');
            this.outputEditor.textContent = text;
        }
    }

    clearOutput() {
        this.setOutputContent('', null);
    }

    bindEvents() {
        document.querySelectorAll('.format-tab').forEach((tab) => {
            tab.addEventListener('click', (event) => {
                this.switchFormat(event.currentTarget.dataset.format);
            });
        });

        this.formatBtn.addEventListener('click', () => this.formatData());
        this.validateBtn.addEventListener('click', () => this.validateData());
        this.minifyBtn.addEventListener('click', () => this.minifyData());
        this.clearBtn.addEventListener('click', () => this.clearData());

        this.exportBtn.addEventListener('click', () => {
            this.exportMenu.classList.toggle('show');
        });

        document.querySelectorAll('.export-option').forEach((option) => {
            option.addEventListener('click', (event) => {
                const format = event.currentTarget.dataset.format;
                this.exportData(format);
                this.exportMenu.classList.remove('show');
            });
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.export-dropdown')) {
                this.exportMenu.classList.remove('show');
            }
        });

        this.inputEditor.addEventListener('input', () => {
            this.updateStats();
            this.autoFormat();
        });

        this.inputEditor.addEventListener('paste', () => {
            setTimeout(() => {
                this.updateStats();
                this.autoFormat();
            }, 100);
        });

        this.inputEditor.addEventListener('scroll', () => {
            this.syncInputLineScroll();
        });

        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
    }
    updateUILanguage() {
        document.getElementById('headerTitle').textContent = this.t('title');
        document.getElementById('headerSubtitle').textContent = this.t('subtitle');
        document.getElementById('inputHeader').textContent = this.t('inputHeader');
        document.getElementById('outputHeader').textContent = this.t('outputHeader');
        document.getElementById('formatText').textContent = this.t('format');
        document.getElementById('validateText').textContent = this.t('validate');
        document.getElementById('minifyText').textContent = this.t('minify');
        document.getElementById('clearText').textContent = this.t('clear');
        document.getElementById('exportText').textContent = this.t('export');
        document.getElementById('exportJsonText').textContent = this.t('exportJson');
        document.getElementById('exportXmlText').textContent = this.t('exportXml');
        document.getElementById('exportExcelText').textContent = this.t('exportExcel');
        document.getElementById('exportCsvText').textContent = this.t('exportCsv');
        this.copyBtn.setAttribute('title', this.t('copy'));
        this.copyBtn.setAttribute('aria-label', this.t('copy'));
        this.copyBtn.dataset.label = this.t('copy');

        this.updateFaqLanguage();
        this.updateSeoMetadata();

        this.switchFormat(this.currentFormat);
        this.updateStatus(this.t('ready'), 'valid');
    }

    updateFaqLanguage() {
        if (this.faqTitle) {
            this.faqTitle.textContent = this.t('faqTitle');
        }

        if (this.faqQuestions && typeof this.faqQuestions.forEach === 'function') {
            this.faqQuestions.forEach((element) => {
                const index = element.dataset.faqQuestion;
                if (!index) {
                    return;
                }
                element.textContent = this.t(`faqQuestion${index}`);
            });
        }

        if (this.faqAnswers && typeof this.faqAnswers.forEach === 'function') {
            this.faqAnswers.forEach((element) => {
                const index = element.dataset.faqAnswer;
                if (!index) {
                    return;
                }
                element.textContent = this.t(`faqAnswer${index}`);
            });
        }
    }

    updateSeoMetadata() {
        const metaTitle = this.t('metaTitle');
        const metaDescription = this.t('metaDescription');
        const metaKeywords = this.t('metaKeywords');
        const ogDescription = this.t('ogDescription');
        const twitterDescription = this.t('twitterDescription');
        const language = this.getCurrentLanguage();

        if (this.rootElement) {
            this.rootElement.lang = language;
        }

        document.title = metaTitle;

        if (this.metaTags) {
            const { description, keywords, ogTitle, ogDescription: ogDesc, twitterTitle, twitterDescription: twitterDesc } = this.metaTags;
            if (description) {
                description.setAttribute('content', metaDescription);
            }
            if (keywords) {
                keywords.setAttribute('content', metaKeywords);
            }
            if (ogTitle) {
                ogTitle.setAttribute('content', metaTitle);
            }
            if (ogDesc) {
                ogDesc.setAttribute('content', ogDescription);
            }
            if (twitterTitle) {
                twitterTitle.setAttribute('content', metaTitle);
            }
            if (twitterDesc) {
                twitterDesc.setAttribute('content', twitterDescription);
            }
        }

        if (this.structuredData) {
            const payload = {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: metaTitle,
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Any',
                description: metaDescription,
                inLanguage: language
            };
            this.structuredData.textContent = JSON.stringify(payload);
        }
    }

    switchFormat(format) {
        this.currentFormat = format;

        document.querySelectorAll('.format-tab').forEach((tab) => {
            tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`[data-format="${format}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        const placeholders = {
            json: this.t('jsonPlaceholder'),
            xml: this.t('xmlPlaceholder')
        };

        this.inputEditor.placeholder = placeholders[format];
        this.autoFormat();
    }

    updateStats() {
        const input = this.inputEditor.value;
        const characters = input.length;
        const lines = input ? input.split('\n').length : 0;
        const size = new Blob([input]).size;

        this.charCount.textContent = `${this.t('characters')}: ${characters.toLocaleString()}`;
        this.lineCount.textContent = `${this.t('lines')}: ${lines.toLocaleString()}`;
        this.sizeInfo.textContent = `${this.t('size')}: ${this.formatBytes(size)}`;
        this.updateInputLineNumbers(lines);
    }

    updateInputLineNumbers(lineCount) {
        if (!this.inputLineNumbers || !this.inputEditor) {
            return;
        }

        const computedLines = typeof lineCount === 'number'
            ? lineCount
            : (this.inputEditor.value ? this.inputEditor.value.split('\n').length : 0);
        const totalLines = Math.max(1, computedLines);

        if (this.lastInputLineCount === totalLines) {
            this.syncInputLineScroll();
            return;
        }

        this.lastInputLineCount = totalLines;
        const numbers = [];
        for (let index = 1; index <= totalLines; index += 1) {
            numbers.push(`<span>${index}</span>`);
        }
        this.inputLineNumbers.innerHTML = numbers.join('');
        this.syncInputLineScroll();
    }

    syncInputLineScroll() {
        if (!this.inputLineNumbers || !this.inputEditor) {
            return;
        }
        this.inputLineNumbers.scrollTop = this.inputEditor.scrollTop;
    }

    autoFormat() {
        const input = this.inputEditor.value.trim();

        if (!input) {
            this.clearOutput();
            this.toggleCopyButton(false);
            this.updateStatus(this.t('ready'), 'valid');
            return;
        }

        if (this.currentFormat === 'json') {
            this.formatJson(input);
        } else {
            this.formatXml(input);
        }
    }

    formatJson(input) {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            this.setOutputContent(formatted, 'json', { highlight: true });
            this.toggleCopyButton(true);
            this.updateStatus(this.t('formatSuccess'), 'valid');
        } catch (error) {
            const details = this.getJsonErrorDetails(error, input);
            this.clearOutput();
            this.toggleCopyButton(false);
            this.updateStatus(details, 'error');
        }
    }

    formatXml(input) {
        try {
            const formatted = this.formatXML(input);
            this.setOutputContent(formatted, 'xml');
            this.toggleCopyButton(true);
            this.updateStatus(this.t('formatSuccess'), 'valid');
        } catch (error) {
            const details = this.getXmlErrorDetails(error, input);
            this.clearOutput();
            this.toggleCopyButton(false);
            this.updateStatus(details, 'error');
        }
    }
    formatData() {
        this.autoFormat();
    }

    validateData() {
        const input = this.inputEditor.value.trim();
        if (!input) {
            this.updateStatus(this.t('noDataToValidate'), 'error');
            return;
        }

        if (this.currentFormat === 'json') {
            try {
                JSON.parse(input);
                this.updateStatus(this.t('validJson'), 'valid');
            } catch (error) {
                const details = this.getJsonErrorDetails(error, input);
                this.updateStatus(details, 'error');
            }
        } else {
            try {
                this.ensureValidXML(input);
                this.updateStatus(this.t('validXml'), 'valid');
            } catch (error) {
                const details = this.getXmlErrorDetails(error, input);
                this.updateStatus(details, 'error');
            }
        }
    }

    minifyData() {
        const input = this.inputEditor.value.trim();
        if (!input) {
            this.updateStatus(this.t('noDataToMinify'), 'error');
            return;
        }

        try {
            let minified;
            if (this.currentFormat === 'json') {
                const parsed = JSON.parse(input);
                minified = JSON.stringify(parsed);
                this.setOutputContent(minified, 'json');
            } else {
                this.ensureValidXML(input);
                minified = input.replace(/>\s+</g, '><').replace(/\n\s*/g, '');
                this.setOutputContent(minified, 'xml');
            }

            this.toggleCopyButton(true);
            this.updateStatus(this.t('minifySuccess'), 'valid');
        } catch (error) {
            const details = this.currentFormat === 'json'
                ? this.getJsonErrorDetails(error, input)
                : this.getXmlErrorDetails(error, input);
            this.updateStatus(details, 'error');
        }
    }

    clearData() {
        this.inputEditor.value = '';
        this.clearOutput();
        this.toggleCopyButton(false);
        this.updateStatus(this.t('dataCleared'), 'valid');
        this.updateStats();
    }

    toggleCopyButton(hasContent) {
        if (hasContent) {
            this.copyBtn.classList.add('visible');
        } else {
            this.copyBtn.classList.remove('visible');
        }
    }

    async copyToClipboard() {
        if (!this.copyBtn.classList.contains('visible')) {
            return;
        }

        const textToCopy = this.lastOutputText;
        if (!textToCopy) {
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            this.copyBtn.classList.add('copied');
            this.copyBtn.setAttribute('title', this.t('copied'));
            this.copyBtn.setAttribute('aria-label', this.t('copied'));
            this.copyBtn.dataset.label = this.t('copied');
            if (this.copyIconPath) {
                this.copyIconPath.setAttribute('d', this.copyIcons.success);
            }

            setTimeout(() => {
                this.copyBtn.classList.remove('copied');
                this.copyBtn.setAttribute('title', this.t('copy'));
                this.copyBtn.setAttribute('aria-label', this.t('copy'));
                this.copyBtn.dataset.label = this.t('copy');
                if (this.copyIconPath) {
                    this.copyIconPath.setAttribute('d', this.copyIcons.default);
                }
            }, 2000);

            this.updateStatus(`${this.t('copied')}!`, 'valid');
        } catch (error) {
            this.updateStatus(`${this.t('errorPrefix')}: ${error.message}`, 'error');
        }
    }
    highlightCode(text) {
        if (this.currentFormat === 'json') {
            return this.highlightJSON(text);
        }
        return this.escapeHtml(text);
    }

    highlightJSON(text) {
        try {
            const data = JSON.parse(text);
            const rows = [];
            let lineNum = 1;
            let idCounter = 0;
            const expandedIcon = '\u25BC';
            const collapsedIcon = '\u25B6';
            const createCollapser = (id) => `
                <span class="json-collapser" data-target="${id}" data-state="expanded" role="button" tabindex="0" aria-label="toggle" aria-expanded="true">${expandedIcon}</span>
            `;

            const addRow = (content, depth) => {
                rows.push(`
                    <div class="json-row">
                        <span class="json-linenum">${lineNum++}</span>
                        <span class="json-content" style="padding-left:${depth * 24}px">${content}</span>
                    </div>
                `);
            };

            const renderValue = (value, depth) => {
                if (typeof value === 'string') {
                    addRow(`<span class="json-string">"${this.escapeHtml(value)}"</span>`, depth);
                } else if (typeof value === 'number') {
                    addRow(`<span class="json-number">${value}</span>`, depth);
                } else if (typeof value === 'boolean') {
                    addRow(`<span class="json-boolean">${value}</span>`, depth);
                } else if (value === null) {
                    addRow('<span class="json-null">null</span>', depth);
                } else if (Array.isArray(value)) {
                    const blockId = `json-arr-${idCounter++}`;
                    addRow(`${createCollapser(blockId)}[`, depth);
                    rows.push(`<div class="json-array json-block" id="${blockId}">`);
                    value.forEach((item, index) => {
                        renderValue(item, depth + 1);
                        if (index < value.length - 1) {
                            rows[rows.length - 1] = rows[rows.length - 1].replace('</span></div>', ',</span></div>');
                        }
                    });
                    rows.push('</div>');
                    addRow(']', depth);
                } else if (typeof value === 'object') {
                    const blockId = `json-obj-${idCounter++}`;
                    addRow(`${createCollapser(blockId)}{`, depth);
                    rows.push(`<div class="json-object json-block" id="${blockId}">`);
                    const keys = Object.keys(value);
                    keys.forEach((key, index) => {
                        const keyMarkup = `<span class="json-key">"${this.escapeHtml(key)}"</span>: `;
                        const previousLength = rows.length;
                        renderValue(value[key], depth + 1);
                        rows[previousLength] = rows[previousLength].replace(/(<span class="json-content"[^>]*>)/, `$1${keyMarkup}`);
                        if (index < keys.length - 1) {
                            rows[rows.length - 1] = rows[rows.length - 1].replace('</span></div>', ',</span></div>');
                        }
                    });
                    rows.push('</div>');
                    addRow('}', depth);
                }
            };

            renderValue(data, 0);

            setTimeout(() => {
                if (!this.outputEditor.dataset.jsonListenerBound) {
                    this.outputEditor.dataset.jsonListenerBound = 'true';
                    const toggle = (element) => {
                        const targetId = element.dataset.target;
                        const block = document.getElementById(targetId);
                        if (!block) {
                            return;
                        }
                        const isCollapsed = block.classList.toggle('collapsed');
                        element.dataset.state = isCollapsed ? 'collapsed' : 'expanded';
                        element.setAttribute('aria-expanded', (!isCollapsed).toString());
                        element.textContent = isCollapsed ? collapsedIcon : expandedIcon;
                    };

                    this.outputEditor.addEventListener('click', (event) => {
                        const trigger = event.target;
                        if (trigger instanceof HTMLElement && trigger.classList.contains('json-collapser')) {
                            toggle(trigger);
                        }
                    });

                    this.outputEditor.addEventListener('keydown', (event) => {
                        const trigger = event.target;
                        if (trigger instanceof HTMLElement && trigger.classList.contains('json-collapser')) {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                toggle(trigger);
                            }
                        }
                    });
                }
            }, 0);

            return `<div class="json-table">${rows.join('')}</div>`;
        } catch (error) {
            return this.escapeHtml(text);
        }
    }

    getJsonErrorDetails(error, input) {
        const lang = this.getCurrentLanguage();
        if (!(error instanceof SyntaxError)) {
            return `${this.t('errorPrefix')}: ${error.message}`;
        }

        const message = error.message || '';
        const positionMatch = message.match(/position\s*(\d+)/i);
        const position = positionMatch ? parseInt(positionMatch[1], 10) : null;
        const context = this.extractContext(input, position);
        const tokenMatch = message.match(/Unexpected token\s*(.)/i);
        const token = tokenMatch ? tokenMatch[1] : null;

        const detail = this.composeJsonHint({ message, token, context, lang });
        const location = context ? (() => {
            const isSpanish = lang === 'es';
            const hasWord = context.word && context.word !== '?';
            const label = hasWord
                ? `"${context.word}"`
                : (isSpanish ? 'este punto' : 'this point');
            return isSpanish
                ? ` Cerca de ${label} (linea ${context.line}, columna ${context.column}).`
                : ` Near ${label} (line ${context.line}, column ${context.column}).`;
        })() : '';

        return `${this.t('errorPrefix')}: ${detail}${location}`;
    }

    composeJsonHint({ message, token, context, lang }) {
        const isSpanish = lang === 'es';
        const hasWord = context && context.word && context.word !== '?';
        const reference = hasWord
            ? `"${context.word}"`
            : (isSpanish ? 'este valor' : 'this value');
        const make = (es, en) => (isSpanish ? es : en);

        if (/unexpected end of json input/i.test(message)) {
            return make(
                "Falta un cierre '}' o ']' al final del documento.",
                "Missing a closing '}' or ']' near the end of the document."
            );
        }

        if (/unexpected string/i.test(message)) {
            return make(
                `Falta una coma ',' antes de la cadena cercana a ${reference}.`,
                `Missing a comma ',' before the string near ${reference}.`
            );
        }

        if (/unexpected number/i.test(message)) {
            return make(
                `Falta una coma ',' antes del numero cerca de ${reference}.`,
                `Missing a comma ',' before the number near ${reference}.`
            );
        }

        if (/unexpected identifier/i.test(message) || /unexpected token\s*(true|false|null)/i.test(message)) {
            return make(
                `Falta una coma ',' o dos puntos ':' alrededor de ${reference}.`,
                `Missing a comma ',' or colon ':' around ${reference}.`
            );
        }

        if (token) {
            if (token === '}' || token === ']') {
                return make(
                    `Falta una coma ',' antes de '${token}' junto a ${reference}.`,
                    `Missing a comma ',' before '${token}' near ${reference}.`
                );
            }
            if (token === '{' || token === '[') {
                return make(
                    `Falta una coma ',' antes de abrir ${token === '{' ? 'un objeto' : 'un arreglo'} junto a ${reference}.`,
                    `Missing a comma ',' before starting a ${token === '{' ? 'object' : 'array'} near ${reference}.`
                );
            }
            if (token === '"') {
                return make(
                    `Falta cerrar con comillas dobles "" el valor cerca de ${reference}.`,
                    `Missing a closing double quote "" near ${reference}.`
                );
            }
            if (token === ':') {
                return make(
                    `Falta un valor despues de ':' para ${reference}.`,
                    `Missing a value after ':' for ${reference}.`
                );
            }
            if (token === ',') {
                return make(
                    `Hay una coma extra ',' cerca de ${reference}.`,
                    `There is an extra comma ',' near ${reference}.`
                );
            }
            if (/[a-z]/i.test(token)) {
                return make(
                    `Las claves y valores deben ir entre comillas dobles. Revisa ${reference}.`,
                    `Keys and values must use double quotes. Check ${reference}.`
                );
            }
            return make(
                `Token inesperado '${token}'. Revisa comillas y comas cerca de ${reference}.`,
                `Unexpected token '${token}'. Check quotes and commas near ${reference}.`
            );
        }

        if (/in json at position/i.test(message)) {
            return make(
                `Revisa la estructura cerca de ${reference}; falta una coma ',' o comillas dobles ".`,
                `Check the structure near ${reference}; a comma ',' or double quotes " may be missing.`
            );
        }

        return make(
            'Error de sintaxis. Revisa comillas, comas y llaves.',
            'Syntax error. Check quotes, commas, and braces.'
        );
    }

    extractContext(text, position) {
        if (position === null || Number.isNaN(position)) {
            return null;
        }

        const safePosition = Math.max(0, Math.min(position, text.length));
        const before = text.slice(0, safePosition);
        const lines = before.split(/\r?\n/);
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        const previousChar = safePosition > 0 ? text[safePosition - 1] : '';
        const currentChar = safePosition < text.length ? text[safePosition] : '';
        const nextChar = safePosition + 1 < text.length ? text[safePosition + 1] : '';

        const beforeMatch = before.match(/["']?[\w$]+["']?$/);
        const afterMatch = text.slice(safePosition).match(/^["']?[\w$]+["']?/);
        const candidate = (afterMatch && afterMatch[0]) || (beforeMatch && beforeMatch[0]) || '';
        const word = candidate.replace(/["']/g, '') || '?';

        return {
            line,
            column,
            word,
            previousChar,
            currentChar,
            nextChar
        };
    }
    ensureValidXML(xmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'text/xml');
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
            throw new Error(errorNode.textContent || 'Invalid XML');
        }
    }

    getXmlErrorDetails(error, input) {
        const lang = this.getCurrentLanguage();
        const base = lang === 'es' ? this.t('xmlError') : this.t('xmlError');
        const detail = error && error.message ? error.message.replace(/\s+/g, ' ').trim() : '';
        return `${this.t('errorPrefix')}: ${base}${detail ? ` (${detail})` : ''}`;
    }

    exportData(format) {
        const rawInput = this.inputEditor.value.trim();
        const hasOutput = Boolean(this.lastOutputText);
        const sourceText = hasOutput ? this.lastOutputText : rawInput;
        const sourceFormat = hasOutput && this.lastOutputFormat ? this.lastOutputFormat : this.currentFormat;

        if (!sourceText) {
            this.updateStatus(this.t('noDataToExport'), 'error');
            return;
        }

        try {
            let content = '';
            let filename = '';
            let mimeType = '';

            switch (format) {
                case 'json':
                    content = sourceFormat === 'json'
                        ? this.prettyJson(sourceText)
                        : this.convertToJSON(sourceText, sourceFormat);
                    filename = 'data.json';
                    mimeType = 'application/json';
                    break;
                case 'xml':
                    content = sourceFormat === 'xml'
                        ? this.formatXML(sourceText)
                        : this.convertToXML(sourceText, sourceFormat);
                    filename = 'data.xml';
                    mimeType = 'application/xml';
                    break;
                case 'csv':
                    content = this.convertToCSV(sourceText, sourceFormat);
                    filename = 'data.csv';
                    mimeType = 'text/csv';
                    break;
                case 'excel':
                    this.exportToExcel(sourceText, sourceFormat);
                    return;
                default:
                    throw new Error('Formato no soportado');
            }

            this.downloadFile(content, filename, mimeType);
            this.updateStatus(`${this.t('exportSuccess')} ${format.toUpperCase()}`, 'valid');
        } catch (error) {
            this.updateStatus(`${this.t('errorPrefix')}: ${error.message}`, 'error');
        }
    }

    prettyJson(text) {
        try {
            const parsed = JSON.parse(text);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            return text;
        }
    }

    convertToJSON(text, sourceFormat = this.currentFormat) {
        if (sourceFormat === 'json') {
            return this.prettyJson(text);
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
            throw new Error(errorNode.textContent || 'XML invalido');
        }

        const obj = this.xmlToJson(doc.documentElement);
        return JSON.stringify(obj, null, 2);
    }

    convertToXML(text, sourceFormat = this.currentFormat) {
        if (sourceFormat === 'xml') {
            return this.formatXML(text);
        }

        const parsed = JSON.parse(text);
        return this.formatXML(this.jsonToXml(parsed));
    }

    convertToCSV(text, sourceFormat = this.currentFormat) {
        const data = this.parseDataForExport(text, sourceFormat);
        const rows = this.normalizeToRows(data);
        if (rows.length === 0) {
            return '';
        }

        const headers = Array.from(rows.reduce((set, row) => {
            Object.keys(row).forEach((key) => set.add(key));
            return set;
        }, new Set()));

        const csvLines = [headers.join(',')];
        rows.forEach((row) => {
            const line = headers.map((header) => this.escapeCsvValue(row[header]));
            csvLines.push(line.join(','));
        });

        return csvLines.join('\n');
    }

    exportToExcel(text, sourceFormat = this.currentFormat) {
        const data = this.parseDataForExport(text, sourceFormat);
        const rows = this.normalizeToRows(data);
        if (rows.length === 0) {
            throw new Error('No hay datos para exportar');
        }

        const headers = Array.from(rows.reduce((set, row) => {
            Object.keys(row).forEach((key) => set.add(key));
            return set;
        }, new Set()));

        const tableRows = [
            `<tr>${headers.map((header) => `<th>${this.escapeHtml(header)}</th>`).join('')}</tr>`
        ];

        rows.forEach((row) => {
            const cells = headers.map((header) => `<td>${this.escapeHtml(row[header] || '')}</td>`);
            tableRows.push(`<tr>${cells.join('')}</tr>`);
        });

        const html = `
            <html>
                <head>
                    <meta charset="UTF-8" />
                </head>
                <body>
                    <table>
                        ${tableRows.join('')}
                    </table>
                </body>
            </html>
        `;

        this.downloadFile(html, 'data.xls', 'application/vnd.ms-excel');
        this.updateStatus(`${this.t('exportSuccess')} EXCEL`, 'valid');
    }

    parseDataForExport(text, sourceFormat = this.currentFormat) {
        if (sourceFormat === 'json') {
            return JSON.parse(text);
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
            throw new Error(errorNode.textContent || 'XML invalido');
        }
        return this.xmlToJson(doc.documentElement);
    }
    normalizeToRows(data) {
        const flattenObject = (value, prefix, target) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    flattenObject(item, `${prefix}[${index}]`, target);
                });
            } else if (value && typeof value === 'object') {
                Object.keys(value).forEach((key) => {
                    const newPrefix = prefix ? `${prefix}.${key}` : key;
                    flattenObject(value[key], newPrefix, target);
                });
            } else {
                target[prefix] = value;
            }
        };

        if (Array.isArray(data)) {
            return data.map((item) => {
                const row = {};
                flattenObject(item, '', row);
                return row;
            });
        }

        const row = {};
        flattenObject(data, '', row);
        return [row];
    }

    escapeCsvValue(value) {
        if (value === undefined || value === null) {
            return '';
        }
        const stringValue = String(value);
        if (/[",\n]/.test(stringValue)) {
            return '"' + stringValue.replace(/"/g, '""') + '"';
        }
        return stringValue;
    }
    xmlToJson(node) {
        if (node.nodeType === 3) {
            return node.nodeValue.trim();
        }

        const obj = {};

        if (node.attributes && node.attributes.length > 0) {
            obj['@attributes'] = {};
            Array.from(node.attributes).forEach((attribute) => {
                obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            });
        }

        if (node.childNodes && node.childNodes.length > 0) {
            Array.from(node.childNodes).forEach((child) => {
                const childName = child.nodeName;
                const childValue = this.xmlToJson(child);
                if (child.nodeType === 3 && childValue === '') {
                    return;
                }
                if (!obj[childName]) {
                    obj[childName] = childValue;
                } else {
                    if (!Array.isArray(obj[childName])) {
                        obj[childName] = [obj[childName]];
                    }
                    obj[childName].push(childValue);
                }
            });
        }

        return obj;
    }

    jsonToXml(obj, nodeName = 'root') {
        let xml = `<${nodeName}>`;
        if (typeof obj !== 'object' || obj === null) {
            xml += `${this.escapeHtml(String(obj))}`;
        } else if (Array.isArray(obj)) {
            obj.forEach((item) => {
                xml += this.jsonToXml(item, nodeName);
            });
            xml += `</${nodeName}>`;
            return xml;
        } else {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                if (key === '@attributes' && typeof value === 'object') {
                    Object.keys(value).forEach((attr) => {
                        xml = xml.replace(`<${nodeName}>`, `<${nodeName} ${attr}="${this.escapeHtml(String(value[attr]))}">`);
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item) => {
                        xml += this.jsonToXml(item, key);
                    });
                } else if (typeof value === 'object' && value !== null) {
                    xml += this.jsonToXml(value, key);
                } else {
                    xml += `<${key}>${this.escapeHtml(String(value))}</${key}>`;
                }
            });
        }
        xml += `</${nodeName}>`;
        return xml;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

   formatXML(xml) {
        this.ensureValidXML(xml);

        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');

        const serialize = (node, depth = 0) => {
            const indent = '  '.repeat(depth);

            if (node.nodeType === Node.TEXT_NODE) {
                const value = node.nodeValue.trim();
                return value ? `${indent}${value}\n` : '';
            }

            if (node.nodeType !== Node.ELEMENT_NODE) {
                return '';
            }

            const attrs = Array.from(node.attributes || [])
                .map((attr) => `${attr.name}="${attr.value}"`)
                .join(' ');
            const openTag = attrs ? `<${node.nodeName} ${attrs}>` : `<${node.nodeName}>`;

            const children = Array.from(node.childNodes);
            if (children.length === 0) {
                return `${indent}${openTag.replace('>', ' />')}\n`;
            }

            const inner = children.map((child) => serialize(child, depth + 1)).join('');
            return `${indent}${openTag}\n${inner}${indent}</${node.nodeName}>\n`;
        };

        const childOutput = Array.from(doc.childNodes)
            .map((node) => serialize(node, 0))
            .join('');

        return childOutput.trim();
    }

    formatBytes(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    }

    updateStatus(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `status-${type}`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new FormatterApp();

    const resizer = document.getElementById('horizontalResizer');
    const leftPanel = document.querySelector('.input-section');
    const rightPanel = document.querySelector('.output-section');
    const container = document.querySelector('.resizable-main');
    let isResizing = false;

    const resizePanels = (event) => {
        if (!isResizing) {
            return;
        }
        const rect = container.getBoundingClientRect();
        let newLeftWidth = event.clientX - rect.left;
        newLeftWidth = Math.max(200, Math.min(newLeftWidth, container.offsetWidth - 200));
        leftPanel.style.flex = 'none';
        leftPanel.style.width = `${newLeftWidth}px`;
        rightPanel.style.flex = '1 1 0';
        rightPanel.style.width = `${container.offsetWidth - newLeftWidth - resizer.offsetWidth}px`;
    };

    const stopResizing = () => {
        isResizing = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', resizePanels);
        document.removeEventListener('mouseup', stopResizing);
    };

    resizer.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isResizing = true;
        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mousemove', resizePanels);
        document.addEventListener('mouseup', stopResizing);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) {
    return;
  }

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach(current => {
        current.classList.remove("open");
      });

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
});
