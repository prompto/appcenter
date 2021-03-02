// Generated from PropTypesExtractor.g4 by ANTLR 4.4

package prompto.utils.prop_types_extractor;

import org.antlr.v4.runtime.misc.NotNull;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link PropTypesExtractorParser}.
 */
@SuppressWarnings("deprecation")
public interface PropTypesExtractorListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#identifier}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier(@NotNull PropTypesExtractorParser.IdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#identifier}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier(@NotNull PropTypesExtractorParser.IdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#entry}.
	 * @param ctx the parse tree
	 */
	void enterEntry(@NotNull PropTypesExtractorParser.EntryContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#entry}.
	 * @param ctx the parse tree
	 */
	void exitEntry(@NotNull PropTypesExtractorParser.EntryContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#method}.
	 * @param ctx the parse tree
	 */
	void enterMethod(@NotNull PropTypesExtractorParser.MethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#method}.
	 * @param ctx the parse tree
	 */
	void exitMethod(@NotNull PropTypesExtractorParser.MethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#array}.
	 * @param ctx the parse tree
	 */
	void enterArray(@NotNull PropTypesExtractorParser.ArrayContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#array}.
	 * @param ctx the parse tree
	 */
	void exitArray(@NotNull PropTypesExtractorParser.ArrayContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#propTypes}.
	 * @param ctx the parse tree
	 */
	void enterPropTypes(@NotNull PropTypesExtractorParser.PropTypesContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#propTypes}.
	 * @param ctx the parse tree
	 */
	void exitPropTypes(@NotNull PropTypesExtractorParser.PropTypesContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(@NotNull PropTypesExtractorParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(@NotNull PropTypesExtractorParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(@NotNull PropTypesExtractorParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(@NotNull PropTypesExtractorParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#body}.
	 * @param ctx the parse tree
	 */
	void enterBody(@NotNull PropTypesExtractorParser.BodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#body}.
	 * @param ctx the parse tree
	 */
	void exitBody(@NotNull PropTypesExtractorParser.BodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#value}.
	 * @param ctx the parse tree
	 */
	void enterValue(@NotNull PropTypesExtractorParser.ValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#value}.
	 * @param ctx the parse tree
	 */
	void exitValue(@NotNull PropTypesExtractorParser.ValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#object}.
	 * @param ctx the parse tree
	 */
	void enterObject(@NotNull PropTypesExtractorParser.ObjectContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#object}.
	 * @param ctx the parse tree
	 */
	void exitObject(@NotNull PropTypesExtractorParser.ObjectContext ctx);
	/**
	 * Enter a parse tree produced by {@link PropTypesExtractorParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(@NotNull PropTypesExtractorParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link PropTypesExtractorParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(@NotNull PropTypesExtractorParser.LiteralContext ctx);
}