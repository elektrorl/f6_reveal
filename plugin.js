CKEDITOR.plugins.add('f6_reveal', {
    lang: 'fr',
    icons: 'f6_reveal',
    init: function(editor) {
        // Plugin logic goes here...
        editor.addContentsCss(this.path + 'styles/f6_reveal.css');
        editor.addCommand('f6_reveal', new CKEDITOR.dialogCommand('f6_revealDialog'));
        editor.ui.addButton('f6_reveal', {
            label: 'Insert Reveal modal',
            command: 'f6_reveal',
            toolbar: 'insert'
        });
        CKEDITOR.dialog.add('f6_revealDialog', this.path + 'dialogs/f6_reveal.js');
    }
});