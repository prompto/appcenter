// Generated from PropTypesExtractor.g4 by ANTLR 4.7.2

	package prompto.utils;

import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class PropTypesExtractorLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		WS=1, LINE_COMMENT=2, MULTI_COMMENT=3, VAR=4, EQ=5, DOT=6, COMMA=7, COLON=8, 
		SEMI=9, LCURL=10, RCURL=11, LPAR=12, RPAR=13, LBRAK=14, RBRAK=15, TRUE=16, 
		FALSE=17, NULL=18, FUNCTION=19, OTHER=20, ID=21, STRING=22, NUMBER=23;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"WS", "LINE_COMMENT", "MULTI_COMMENT", "VAR", "EQ", "DOT", "COMMA", "COLON", 
			"SEMI", "LCURL", "RCURL", "LPAR", "RPAR", "LBRAK", "RBRAK", "TRUE", "FALSE", 
			"NULL", "FUNCTION", "OTHER", "ID", "STRING", "NUMBER"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, "'var'", "'='", "'.'", "','", "':'", "';'", "'{'", 
			"'}'", "'('", "')'", "'['", "']'", "'true'", "'false'", "'null'", "'function'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "WS", "LINE_COMMENT", "MULTI_COMMENT", "VAR", "EQ", "DOT", "COMMA", 
			"COLON", "SEMI", "LCURL", "RCURL", "LPAR", "RPAR", "LBRAK", "RBRAK", 
			"TRUE", "FALSE", "NULL", "FUNCTION", "OTHER", "ID", "STRING", "NUMBER"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public PropTypesExtractorLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "PropTypesExtractor.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\31\u00aa\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\3\2"+
		"\6\2\63\n\2\r\2\16\2\64\3\2\3\2\3\3\3\3\3\3\3\3\7\3=\n\3\f\3\16\3@\13"+
		"\3\3\3\3\3\3\4\3\4\3\4\3\4\7\4H\n\4\f\4\16\4K\13\4\3\4\3\4\3\4\3\5\3\5"+
		"\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r"+
		"\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3\21\3\21\3\21\3\22\3\22"+
		"\3\22\3\22\3\22\3\22\3\23\3\23\3\23\3\23\3\23\3\24\3\24\3\24\3\24\3\24"+
		"\3\24\3\24\3\24\3\24\3\25\3\25\3\26\6\26\u0086\n\26\r\26\16\26\u0087\3"+
		"\27\3\27\7\27\u008c\n\27\f\27\16\27\u008f\13\27\3\27\3\27\3\27\7\27\u0094"+
		"\n\27\f\27\16\27\u0097\13\27\3\27\5\27\u009a\n\27\3\30\3\30\7\30\u009e"+
		"\n\30\f\30\16\30\u00a1\13\30\3\30\3\30\6\30\u00a5\n\30\r\30\16\30\u00a6"+
		"\5\30\u00a9\n\30\4>I\2\31\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25"+
		"\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\3\2\t"+
		"\5\2\13\f\17\17\"\"\n\2##\'(,-//\61\61>>@A~~\6\2\62;C\\aac|\6\2\f\f\17"+
		"\17$$^^\6\2\f\f\17\17))^^\3\2\63;\3\2\62;\2\u00b3\2\3\3\2\2\2\2\5\3\2"+
		"\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21"+
		"\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2"+
		"\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3"+
		"\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\3\62\3\2\2\2\58\3\2"+
		"\2\2\7C\3\2\2\2\tO\3\2\2\2\13S\3\2\2\2\rU\3\2\2\2\17W\3\2\2\2\21Y\3\2"+
		"\2\2\23[\3\2\2\2\25]\3\2\2\2\27_\3\2\2\2\31a\3\2\2\2\33c\3\2\2\2\35e\3"+
		"\2\2\2\37g\3\2\2\2!i\3\2\2\2#n\3\2\2\2%t\3\2\2\2\'y\3\2\2\2)\u0082\3\2"+
		"\2\2+\u0085\3\2\2\2-\u0099\3\2\2\2/\u009b\3\2\2\2\61\63\t\2\2\2\62\61"+
		"\3\2\2\2\63\64\3\2\2\2\64\62\3\2\2\2\64\65\3\2\2\2\65\66\3\2\2\2\66\67"+
		"\b\2\2\2\67\4\3\2\2\289\7\61\2\29:\7\61\2\2:>\3\2\2\2;=\13\2\2\2<;\3\2"+
		"\2\2=@\3\2\2\2>?\3\2\2\2><\3\2\2\2?A\3\2\2\2@>\3\2\2\2AB\7\f\2\2B\6\3"+
		"\2\2\2CD\7\61\2\2DE\7,\2\2EI\3\2\2\2FH\13\2\2\2GF\3\2\2\2HK\3\2\2\2IJ"+
		"\3\2\2\2IG\3\2\2\2JL\3\2\2\2KI\3\2\2\2LM\7,\2\2MN\7\61\2\2N\b\3\2\2\2"+
		"OP\7x\2\2PQ\7c\2\2QR\7t\2\2R\n\3\2\2\2ST\7?\2\2T\f\3\2\2\2UV\7\60\2\2"+
		"V\16\3\2\2\2WX\7.\2\2X\20\3\2\2\2YZ\7<\2\2Z\22\3\2\2\2[\\\7=\2\2\\\24"+
		"\3\2\2\2]^\7}\2\2^\26\3\2\2\2_`\7\177\2\2`\30\3\2\2\2ab\7*\2\2b\32\3\2"+
		"\2\2cd\7+\2\2d\34\3\2\2\2ef\7]\2\2f\36\3\2\2\2gh\7_\2\2h \3\2\2\2ij\7"+
		"v\2\2jk\7t\2\2kl\7w\2\2lm\7g\2\2m\"\3\2\2\2no\7h\2\2op\7c\2\2pq\7n\2\2"+
		"qr\7u\2\2rs\7g\2\2s$\3\2\2\2tu\7p\2\2uv\7w\2\2vw\7n\2\2wx\7n\2\2x&\3\2"+
		"\2\2yz\7h\2\2z{\7w\2\2{|\7p\2\2|}\7e\2\2}~\7v\2\2~\177\7k\2\2\177\u0080"+
		"\7q\2\2\u0080\u0081\7p\2\2\u0081(\3\2\2\2\u0082\u0083\t\3\2\2\u0083*\3"+
		"\2\2\2\u0084\u0086\t\4\2\2\u0085\u0084\3\2\2\2\u0086\u0087\3\2\2\2\u0087"+
		"\u0085\3\2\2\2\u0087\u0088\3\2\2\2\u0088,\3\2\2\2\u0089\u008d\7$\2\2\u008a"+
		"\u008c\n\5\2\2\u008b\u008a\3\2\2\2\u008c\u008f\3\2\2\2\u008d\u008b\3\2"+
		"\2\2\u008d\u008e\3\2\2\2\u008e\u0090\3\2\2\2\u008f\u008d\3\2\2\2\u0090"+
		"\u009a\7$\2\2\u0091\u0095\7)\2\2\u0092\u0094\n\6\2\2\u0093\u0092\3\2\2"+
		"\2\u0094\u0097\3\2\2\2\u0095\u0093\3\2\2\2\u0095\u0096\3\2\2\2\u0096\u0098"+
		"\3\2\2\2\u0097\u0095\3\2\2\2\u0098\u009a\7)\2\2\u0099\u0089\3\2\2\2\u0099"+
		"\u0091\3\2\2\2\u009a.\3\2\2\2\u009b\u009f\t\7\2\2\u009c\u009e\t\b\2\2"+
		"\u009d\u009c\3\2\2\2\u009e\u00a1\3\2\2\2\u009f\u009d\3\2\2\2\u009f\u00a0"+
		"\3\2\2\2\u00a0\u00a8\3\2\2\2\u00a1\u009f\3\2\2\2\u00a2\u00a4\5\r\7\2\u00a3"+
		"\u00a5\t\b\2\2\u00a4\u00a3\3\2\2\2\u00a5\u00a6\3\2\2\2\u00a6\u00a4\3\2"+
		"\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00a9\3\2\2\2\u00a8\u00a2\3\2\2\2\u00a8"+
		"\u00a9\3\2\2\2\u00a9\60\3\2\2\2\r\2\64>I\u0087\u008d\u0095\u0099\u009f"+
		"\u00a6\u00a8\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}