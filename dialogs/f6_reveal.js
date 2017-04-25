CKEDITOR.dialog.add('f6_revealDialog', function(editor) {
    return {
        title: editor.lang.f6_reveal.title,
        minWidth: 400,
        minHeight: 120,
        contents: [{
            id: 'tab-basic',
            label: 'Basic Settings',
            elements: [{
                type: 'radio',
                id: 'tailleWindow',
                label: editor.lang.f6_reveal.tailleWindow,
                items: [
                    [editor.lang.f6_reveal.tiny, 'tiny'],
                    [editor.lang.f6_reveal.small, 'small'],
                    [editor.lang.f6_reveal.large, 'large'],
                    [editor.lang.f6_reveal.full, 'full']
                ],
                'default': 'large',
                setup: function(element) {
                    this.setValue(element.getAttribute("data-size"));
                }
            }, {
                type: 'text',
                id: 'id_unique',
                label: editor.lang.f6_reveal.identifiantUnique,
                validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.f6_reveal.validation),
                setup: function(element) {
                    this.setValue(element.getAttribute("data-open"));
                }
            }]
        }],
        onShow: function() {
            var randomString = 'id-' + Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
            this.setValueOf('tab-basic', 'id_unique', randomString);
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            if (element) element = element.getAscendant('a', true);
            if (!element || element.getName() != 'a') {
                element = editor.document.createElement('a');
                element.setText(randomString);
                this.insertMode = true;
            } else {
                this.insertMode = false;
            }
            if (!this.insertMode) {
                this.setupContent(element);
            }
        },
        onOk: function() {
            var dialog = this;
            var selectedText = editor.getSelection().getSelectedText();
            var closeButton = '<button class="close-button" data-close aria-label="Close modal" type="button"><span aria-hidden="true">&times;</span></button>';
            var triggerReveal = editor.document.createElement('a');
            triggerReveal.setText(selectedText);
            triggerReveal.setAttribute('data-open', dialog.getValueOf('tab-basic', 'id_unique'));
            triggerReveal.setAttribute('data-size', dialog.getValueOf('tab-basic', 'tailleWindow'));
            editor.insertElement(triggerReveal);
            var reveal = new CKEDITOR.dom.element('div');
            reveal.setHtml(editor.lang.f6_reveal.defaultTextAreaValue + closeButton);
            reveal.setAttribute('class', 'reveal');
            reveal.setAttribute('id', dialog.getValueOf('tab-basic', 'id_unique'));
            reveal.setAttribute('data-reveal', '');
            var size = dialog.getValueOf('tab-basic', 'tailleWindow');
            if (size) reveal.setAttribute('class', 'reveal' + ' ' + size);
            var range = editor.createRange();
            range.setEndAt(editor.editable(), CKEDITOR.POSITION_BEFORE_END);
            var revealContents = '<label class="id-reveal">&rarr; ' + selectedText + '</label>' + reveal.getOuterHtml();
            if (editor.document.$.getElementById('containercontentsmodal') === null) {
                editor.insertHtml('<div id="containercontentsmodal">' + revealContents + '</div>', 'html', range);
            } else {
                if (editor.document.$.getElementById(dialog.getValueOf('tab-basic', 'id_unique')) !== null) {
                    editor.document.$.getElementById(dialog.getValueOf('tab-basic', 'id_unique')).remove();
                    editor.document.$.getElementById('containercontentsmodal').insertAdjacentHTML('beforeend', revealContents);
                } else {
                    editor.document.$.getElementById('containercontentsmodal').insertAdjacentHTML('beforeend', revealContents);
                }
            }
        }
    };
});