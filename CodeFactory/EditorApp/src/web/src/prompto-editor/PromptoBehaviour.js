var context = null;
let contextCache = {};

function initContext(editor) {
    var id = -1;
    if (editor.multiSelect) {
        id = editor.selection.index;
        if (contextCache.rangeCount !== editor.multiSelect.rangeCount)
            contextCache = {rangeCount: editor.multiSelect.rangeCount};
    }
    context = contextCache[id];
    if(!context)
        context = {
            autoInsertedBrackets: 0,
            autoInsertedRow: -1,
            autoInsertedLineEnd: "",
            maybeInsertedBrackets: 0,
            maybeInsertedRow: -1,
            maybeInsertedLineStart: "",
            maybeInsertedLineEnd: ""
        };
    contextCache[id] = context;
    return context;
 }

function getWrapped(selection, selected, opening, closing) {
    var rowDiff = selection.end.row - selection.start.row;
    return {
        text: opening + selected + closing,
        selection: [
            0,
            selection.start.column + 1,
            rowDiff,
            selection.end.column + (rowDiff ? 0 : 1)
        ]
    };
}

const LEFT_RIGHT = {'"' : '"', "'" : "'", '(' : ')', '{' : '}', '[' : ']'};
const RIGHT_LEFT = {'"' : '"', "'" : "'", ')' : '(', '}' : '{', ']' : '['};

export default class PromptoBehaviour extends window.ace.acequire("ace/mode/behaviour").Behaviour {

    constructor(options) {
        super(options);
        this.add("enclosing", "insertion", this.onEnclosingInsertion.bind(this));
    }

    onEnclosingInsertion(state, action, editor, session, text) {
        if (LEFT_RIGHT[text]) {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return getWrapped(selection, selected, text, LEFT_RIGHT[text]);
            } else if (this.isSaneInsertion(editor, session)) {
                this.recordAutoInsert(editor, session, LEFT_RIGHT[text]);
                return {
                    text: text + LEFT_RIGHT[text],
                    selection: [1, 1]
                };
            }
        } else if (RIGHT_LEFT[text]) {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === text) {
                var matching = session.$findOpeningBracket(text, {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && this.isAutoInsertedClosing(cursor, line, text)) {
                    this.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    }

    isSaneInsertion(editor, session) {
        return true;
    }

    recordAutoInsert(editor, session, text) {

    }

    popAutoInsertedClosing() {

    }

    isAutoInsertedClosing(cursor, line, text) {
        return true; // TODO
    }


}