// Generated from PropTypesExtractor.g4 by ANTLR 4.7.2

	package prompto.utils;

import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link PropTypesExtractorParser}.
 */
public interface PropTypesExtractorListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#propTypes}.
	 * @param ctx the parse tree
	 */
	void enterPropTypes(PropTypesExtractorParser.PropTypesContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#propTypes}.
	 * @param ctx the parse tree
	 */
	void exitPropTypes(PropTypesExtractorParser.PropTypesContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#identifier}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier(PropTypesExtractorParser.IdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#identifier}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier(PropTypesExtractorParser.IdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#value}.
	 * @param ctx the parse tree
	 */
	void enterValue(PropTypesExtractorParser.ValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#value}.
	 * @param ctx the parse tree
	 */
	void exitValue(PropTypesExtractorParser.ValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#method}.
	 * @param ctx the parse tree
	 */
	void enterMethod(PropTypesExtractorParser.MethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#method}.
	 * @param ctx the parse tree
	 */
	void exitMethod(PropTypesExtractorParser.MethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(PropTypesExtractorParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(PropTypesExtractorParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#body}.
	 * @param ctx the parse tree
	 */
	void enterBody(PropTypesExtractorParser.BodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#body}.
	 * @param ctx the parse tree
	 */
	void exitBody(PropTypesExtractorParser.BodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#array}.
	 * @param ctx the parse tree
	 */
	void enterArray(PropTypesExtractorParser.ArrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#array}.
	 * @param ctx the parse tree
	 */
	void exitArray(PropTypesExtractorParser.ArrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#object}.
	 * @param ctx the parse tree
	 */
	void enterObject(PropTypesExtractorParser.ObjectContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#object}.
	 * @param ctx the parse tree
	 */
	void exitObject(PropTypesExtractorParser.ObjectContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#entry}.
	 * @param ctx the parse tree
	 */
	void enterEntry(PropTypesExtractorParser.EntryContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#entry}.
	 * @param ctx the parse tree
	 */
	void exitEntry(PropTypesExtractorParser.EntryContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(PropTypesExtractorParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(PropTypesExtractorParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(PropTypesExtractorParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(PropTypesExtractorParser.LiteralContext ctx);
}