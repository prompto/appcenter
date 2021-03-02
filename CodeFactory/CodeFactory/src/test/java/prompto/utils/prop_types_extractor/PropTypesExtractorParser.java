// Generated from PropTypesExtractor.g4 by ANTLR 4.4

package prompto.utils.prop_types_extractor;

import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class PropTypesExtractorParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.4", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		WS=1, LINE_COMMENT=2, MULTI_COMMENT=3, VAR=4, EQ=5, DOT=6, COMMA=7, COLON=8, 
		SEMI=9, LCURL=10, RCURL=11, LPAR=12, RPAR=13, LBRAK=14, RBRAK=15, TRUE=16, 
		FALSE=17, NULL=18, FUNCTION=19, OTHER=20, ID=21, STRING=22, NUMBER=23;
	public static final String[] tokenNames = {
		"<INVALID>", "WS", "LINE_COMMENT", "MULTI_COMMENT", "'var'", "'='", "'.'", 
		"','", "':'", "';'", "'{'", "'}'", "'('", "')'", "'['", "']'", "'true'", 
		"'false'", "'null'", "'function'", "OTHER", "ID", "STRING", "NUMBER"
	};
	public static final int
		RULE_propTypes = 0, RULE_identifier = 1, RULE_value = 2, RULE_method = 3, 
		RULE_function = 4, RULE_body = 5, RULE_array = 6, RULE_object = 7, RULE_entry = 8, 
		RULE_comment = 9, RULE_literal = 10;
	public static final String[] ruleNames = {
		"propTypes", "identifier", "value", "method", "function", "body", "array", 
		"object", "entry", "comment", "literal"
	};

	@Override
	public String getGrammarFileName() { return "PropTypesExtractor.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public PropTypesExtractorParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class PropTypesContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(PropTypesExtractorParser.ID, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public TerminalNode VAR() { return getToken(PropTypesExtractorParser.VAR, 0); }
		public TerminalNode SEMI() { return getToken(PropTypesExtractorParser.SEMI, 0); }
		public TerminalNode EOF() { return getToken(PropTypesExtractorParser.EOF, 0); }
		public TerminalNode EQ() { return getToken(PropTypesExtractorParser.EQ, 0); }
		public PropTypesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propTypes; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterPropTypes(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitPropTypes(this);
		}
	}

	public final PropTypesContext propTypes() throws RecognitionException {
		PropTypesContext _localctx = new PropTypesContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_propTypes);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22); match(VAR);
			setState(23); match(ID);
			setState(24); match(EQ);
			setState(25); value(0);
			setState(26); match(SEMI);
			setState(27); match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public List<TerminalNode> ID() { return getTokens(PropTypesExtractorParser.ID); }
		public List<TerminalNode> DOT() { return getTokens(PropTypesExtractorParser.DOT); }
		public TerminalNode ID(int i) {
			return getToken(PropTypesExtractorParser.ID, i);
		}
		public TerminalNode DOT(int i) {
			return getToken(PropTypesExtractorParser.DOT, i);
		}
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitIdentifier(this);
		}
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(29); match(ID);
			setState(34);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(30); match(DOT);
					setState(31); match(ID);
					}
					} 
				}
				setState(36);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ValueContext extends ParserRuleContext {
		public TerminalNode DOT() { return getToken(PropTypesExtractorParser.DOT, 0); }
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public MethodContext method() {
			return getRuleContext(MethodContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public ObjectContext object() {
			return getRuleContext(ObjectContext.class,0);
		}
		public ValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_value; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitValue(this);
		}
	}

	public final ValueContext value() throws RecognitionException {
		return value(0);
	}

	private ValueContext value(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ValueContext _localctx = new ValueContext(_ctx, _parentState);
		ValueContext _prevctx = _localctx;
		int _startState = 4;
		enterRecursionRule(_localctx, 4, RULE_value, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(44);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				{
				setState(38); method();
				}
				break;
			case 2:
				{
				setState(39); function();
				}
				break;
			case 3:
				{
				setState(40); identifier();
				}
				break;
			case 4:
				{
				setState(41); array();
				}
				break;
			case 5:
				{
				setState(42); object();
				}
				break;
			case 6:
				{
				setState(43); literal();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(51);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ValueContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_value);
					setState(46);
					if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
					setState(47); match(DOT);
					setState(48); value(2);
					}
					} 
				}
				setState(53);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class MethodContext extends ParserRuleContext {
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PropTypesExtractorParser.COMMA); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public TerminalNode LPAR() { return getToken(PropTypesExtractorParser.LPAR, 0); }
		public TerminalNode RPAR() { return getToken(PropTypesExtractorParser.RPAR, 0); }
		public TerminalNode COMMA(int i) {
			return getToken(PropTypesExtractorParser.COMMA, i);
		}
		public MethodContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_method; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterMethod(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitMethod(this);
		}
	}

	public final MethodContext method() throws RecognitionException {
		MethodContext _localctx = new MethodContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_method);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(54); identifier();
			setState(55); match(LPAR);
			setState(56); value(0);
			setState(61);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(57); match(COMMA);
				setState(58); value(0);
				}
				}
				setState(63);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(64); match(RPAR);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(PropTypesExtractorParser.ID, 0); }
		public TerminalNode FUNCTION() { return getToken(PropTypesExtractorParser.FUNCTION, 0); }
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(PropTypesExtractorParser.COMMA); }
		public TerminalNode LPAR() { return getToken(PropTypesExtractorParser.LPAR, 0); }
		public TerminalNode RPAR() { return getToken(PropTypesExtractorParser.RPAR, 0); }
		public BodyContext body() {
			return getRuleContext(BodyContext.class,0);
		}
		public TerminalNode COMMA(int i) {
			return getToken(PropTypesExtractorParser.COMMA, i);
		}
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterFunction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitFunction(this);
		}
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(66); match(FUNCTION);
			setState(68);
			_la = _input.LA(1);
			if (_la==ID) {
				{
				setState(67); match(ID);
				}
			}

			setState(70); match(LPAR);
			setState(71); value(0);
			setState(76);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(72); match(COMMA);
				setState(73); value(0);
				}
				}
				setState(78);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(79); match(RPAR);
			setState(80); body();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BodyContext extends ParserRuleContext {
		public TerminalNode LCURL() { return getToken(PropTypesExtractorParser.LCURL, 0); }
		public TerminalNode RCURL() { return getToken(PropTypesExtractorParser.RCURL, 0); }
		public BodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_body; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterBody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitBody(this);
		}
	}

	public final BodyContext body() throws RecognitionException {
		BodyContext _localctx = new BodyContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_body);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(82); match(LCURL);
			setState(86);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
			while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1+1 ) {
					{
					{
					setState(83);
					matchWildcard();
					}
					} 
				}
				setState(88);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
			}
			setState(89); match(RCURL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ArrayContext extends ParserRuleContext {
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public TerminalNode RBRAK() { return getToken(PropTypesExtractorParser.RBRAK, 0); }
		public List<TerminalNode> COMMA() { return getTokens(PropTypesExtractorParser.COMMA); }
		public TerminalNode LBRAK() { return getToken(PropTypesExtractorParser.LBRAK, 0); }
		public TerminalNode COMMA(int i) {
			return getToken(PropTypesExtractorParser.COMMA, i);
		}
		public ArrayContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_array; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterArray(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitArray(this);
		}
	}

	public final ArrayContext array() throws RecognitionException {
		ArrayContext _localctx = new ArrayContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_array);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91); match(LBRAK);
			setState(92); value(0);
			setState(97);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(93); match(COMMA);
				setState(94); value(0);
				}
				}
				setState(99);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(100); match(RBRAK);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ObjectContext extends ParserRuleContext {
		public EntryContext entry(int i) {
			return getRuleContext(EntryContext.class,i);
		}
		public TerminalNode LCURL() { return getToken(PropTypesExtractorParser.LCURL, 0); }
		public List<TerminalNode> COMMA() { return getTokens(PropTypesExtractorParser.COMMA); }
		public TerminalNode RCURL() { return getToken(PropTypesExtractorParser.RCURL, 0); }
		public List<EntryContext> entry() {
			return getRuleContexts(EntryContext.class);
		}
		public TerminalNode COMMA(int i) {
			return getToken(PropTypesExtractorParser.COMMA, i);
		}
		public ObjectContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_object; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterObject(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitObject(this);
		}
	}

	public final ObjectContext object() throws RecognitionException {
		ObjectContext _localctx = new ObjectContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_object);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(102); match(LCURL);
			setState(111);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LINE_COMMENT) | (1L << MULTI_COMMENT) | (1L << ID) | (1L << STRING))) != 0)) {
				{
				setState(103); entry();
				setState(108);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(104); match(COMMA);
					setState(105); entry();
					}
					}
					setState(110);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(113); match(RCURL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EntryContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(PropTypesExtractorParser.ID, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public List<CommentContext> comment() {
			return getRuleContexts(CommentContext.class);
		}
		public CommentContext comment(int i) {
			return getRuleContext(CommentContext.class,i);
		}
		public TerminalNode COLON() { return getToken(PropTypesExtractorParser.COLON, 0); }
		public TerminalNode STRING() { return getToken(PropTypesExtractorParser.STRING, 0); }
		public EntryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_entry; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterEntry(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitEntry(this);
		}
	}

	public final EntryContext entry() throws RecognitionException {
		EntryContext _localctx = new EntryContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_entry);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(118);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==LINE_COMMENT || _la==MULTI_COMMENT) {
				{
				{
				setState(115); comment();
				}
				}
				setState(120);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(121);
			_la = _input.LA(1);
			if ( !(_la==ID || _la==STRING) ) {
			_errHandler.recoverInline(this);
			}
			consume();
			setState(122); match(COLON);
			setState(123); value(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CommentContext extends ParserRuleContext {
		public TerminalNode LINE_COMMENT() { return getToken(PropTypesExtractorParser.LINE_COMMENT, 0); }
		public TerminalNode MULTI_COMMENT() { return getToken(PropTypesExtractorParser.MULTI_COMMENT, 0); }
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterComment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitComment(this);
		}
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_comment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(125);
			_la = _input.LA(1);
			if ( !(_la==LINE_COMMENT || _la==MULTI_COMMENT) ) {
			_errHandler.recoverInline(this);
			}
			consume();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LiteralContext extends ParserRuleContext {
		public TerminalNode NULL() { return getToken(PropTypesExtractorParser.NULL, 0); }
		public TerminalNode FALSE() { return getToken(PropTypesExtractorParser.FALSE, 0); }
		public TerminalNode TRUE() { return getToken(PropTypesExtractorParser.TRUE, 0); }
		public TerminalNode STRING() { return getToken(PropTypesExtractorParser.STRING, 0); }
		public TerminalNode NUMBER() { return getToken(PropTypesExtractorParser.NUMBER, 0); }
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).enterLiteral(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof PropTypesExtractorListener ) ((PropTypesExtractorListener)listener).exitLiteral(this);
		}
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(127);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << TRUE) | (1L << FALSE) | (1L << NULL) | (1L << STRING) | (1L << NUMBER))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			consume();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 2: return value_sempred((ValueContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean value_sempred(ValueContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0: return precpred(_ctx, 1);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd\3\31\u0084\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\7\3#\n\3\f\3\16"+
		"\3&\13\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\5\4/\n\4\3\4\3\4\3\4\7\4\64\n\4\f"+
		"\4\16\4\67\13\4\3\5\3\5\3\5\3\5\3\5\7\5>\n\5\f\5\16\5A\13\5\3\5\3\5\3"+
		"\6\3\6\5\6G\n\6\3\6\3\6\3\6\3\6\7\6M\n\6\f\6\16\6P\13\6\3\6\3\6\3\6\3"+
		"\7\3\7\7\7W\n\7\f\7\16\7Z\13\7\3\7\3\7\3\b\3\b\3\b\3\b\7\bb\n\b\f\b\16"+
		"\be\13\b\3\b\3\b\3\t\3\t\3\t\3\t\7\tm\n\t\f\t\16\tp\13\t\5\tr\n\t\3\t"+
		"\3\t\3\n\7\nw\n\n\f\n\16\nz\13\n\3\n\3\n\3\n\3\n\3\13\3\13\3\f\3\f\3\f"+
		"\3X\3\6\r\2\4\6\b\n\f\16\20\22\24\26\2\5\3\2\27\30\3\2\4\5\4\2\22\24\30"+
		"\31\u0087\2\30\3\2\2\2\4\37\3\2\2\2\6.\3\2\2\2\b8\3\2\2\2\nD\3\2\2\2\f"+
		"T\3\2\2\2\16]\3\2\2\2\20h\3\2\2\2\22x\3\2\2\2\24\177\3\2\2\2\26\u0081"+
		"\3\2\2\2\30\31\7\6\2\2\31\32\7\27\2\2\32\33\7\7\2\2\33\34\5\6\4\2\34\35"+
		"\7\13\2\2\35\36\7\2\2\3\36\3\3\2\2\2\37$\7\27\2\2 !\7\b\2\2!#\7\27\2\2"+
		"\" \3\2\2\2#&\3\2\2\2$\"\3\2\2\2$%\3\2\2\2%\5\3\2\2\2&$\3\2\2\2\'(\b\4"+
		"\1\2(/\5\b\5\2)/\5\n\6\2*/\5\4\3\2+/\5\16\b\2,/\5\20\t\2-/\5\26\f\2.\'"+
		"\3\2\2\2.)\3\2\2\2.*\3\2\2\2.+\3\2\2\2.,\3\2\2\2.-\3\2\2\2/\65\3\2\2\2"+
		"\60\61\f\3\2\2\61\62\7\b\2\2\62\64\5\6\4\4\63\60\3\2\2\2\64\67\3\2\2\2"+
		"\65\63\3\2\2\2\65\66\3\2\2\2\66\7\3\2\2\2\67\65\3\2\2\289\5\4\3\29:\7"+
		"\16\2\2:?\5\6\4\2;<\7\t\2\2<>\5\6\4\2=;\3\2\2\2>A\3\2\2\2?=\3\2\2\2?@"+
		"\3\2\2\2@B\3\2\2\2A?\3\2\2\2BC\7\17\2\2C\t\3\2\2\2DF\7\25\2\2EG\7\27\2"+
		"\2FE\3\2\2\2FG\3\2\2\2GH\3\2\2\2HI\7\16\2\2IN\5\6\4\2JK\7\t\2\2KM\5\6"+
		"\4\2LJ\3\2\2\2MP\3\2\2\2NL\3\2\2\2NO\3\2\2\2OQ\3\2\2\2PN\3\2\2\2QR\7\17"+
		"\2\2RS\5\f\7\2S\13\3\2\2\2TX\7\f\2\2UW\13\2\2\2VU\3\2\2\2WZ\3\2\2\2XY"+
		"\3\2\2\2XV\3\2\2\2Y[\3\2\2\2ZX\3\2\2\2[\\\7\r\2\2\\\r\3\2\2\2]^\7\20\2"+
		"\2^c\5\6\4\2_`\7\t\2\2`b\5\6\4\2a_\3\2\2\2be\3\2\2\2ca\3\2\2\2cd\3\2\2"+
		"\2df\3\2\2\2ec\3\2\2\2fg\7\21\2\2g\17\3\2\2\2hq\7\f\2\2in\5\22\n\2jk\7"+
		"\t\2\2km\5\22\n\2lj\3\2\2\2mp\3\2\2\2nl\3\2\2\2no\3\2\2\2or\3\2\2\2pn"+
		"\3\2\2\2qi\3\2\2\2qr\3\2\2\2rs\3\2\2\2st\7\r\2\2t\21\3\2\2\2uw\5\24\13"+
		"\2vu\3\2\2\2wz\3\2\2\2xv\3\2\2\2xy\3\2\2\2y{\3\2\2\2zx\3\2\2\2{|\t\2\2"+
		"\2|}\7\n\2\2}~\5\6\4\2~\23\3\2\2\2\177\u0080\t\3\2\2\u0080\25\3\2\2\2"+
		"\u0081\u0082\t\4\2\2\u0082\27\3\2\2\2\r$.\65?FNXcnqx";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}