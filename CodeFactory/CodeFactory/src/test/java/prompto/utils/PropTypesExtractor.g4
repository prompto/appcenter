grammar PropTypesExtractor;

@header {
	package prompto.utils;
}

WS: [ \t\n\r]+ -> skip
    ;

LINE_COMMENT:
	'//' .*? '\n'
	;
	
MULTI_COMMENT:	
    '/*' .*? '*/'
    ;

VAR: 'var';
EQ: '=';
DOT: '.';
COMMA: ',';
COLON: ':';
SEMI: ';';
LCURL: '{';
RCURL: '}';
LPAR: '(';
RPAR: ')';
LBRAK: '[';
RBRAK: ']';
TRUE: 'true';
FALSE: 'false';
NULL: 'null';
FUNCTION: 'function';
OTHER: '&' | '|' | '!' | '?' | '<' | '>' | '-' | '+' | '*' | '/' | '%';

ID: [_a-zA-Z0-9]+ 
    ;

STRING:
    '"' (   ~( '\\' | '"' | '\r' | '\n' ) )* '"'
    | '\'' (   ~( '\\' | '\'' | '\r' | '\n' ) )* '\''
    ;

NUMBER:
    [1-9][0-9]*( DOT [0-9]+ )?
    ;

propTypes:
    VAR ID EQ value SEMI EOF
    ;

identifier:
    ID ( DOT ID )*
    ;

value:
    method
    | function
    | identifier
    | array
    | object
    | literal
    | value DOT value
    ;

method:
	identifier LPAR value ( COMMA value ) * RPAR
	;

function:
    FUNCTION  ID? LPAR value ( COMMA value ) * RPAR body
    ;

body:
    LCURL .*? RCURL 
    ;

array:
    LBRAK value ( COMMA value ) * RBRAK
    ;

object:
    LCURL ( entry ( COMMA entry )* )? RCURL
    ;

entry:
    comment* (ID | STRING) COLON value
    ;

comment:
	LINE_COMMENT
	| MULTI_COMMENT
	;
	
literal:
    STRING
    | NUMBER
    | TRUE
    | FALSE
    | NULL
    ;