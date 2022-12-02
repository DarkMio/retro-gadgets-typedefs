const tstl = require("typescript-to-lua");
const { SourceNode } = require("source-map");

/**
 * @param {SourceNode} node 
 * @return {string}
 */
const expandSourceNode = (node) => {
    const list = node.children.map((child) => {
        if (typeof child === "string") {
            return child
        } else {
            return expandSourceNode(child)
        }
    })
    return list.join("")
}

/**
 * @param {SourceNode} node 
 * @return {SourceNode}
 */
 const delUpdateLocalFromSourceNode = (node) => {
    const strLocal = expandSourceNode(node.children?.[0])
    if (strLocal.trimEnd() === "local") {
        node.children.splice(0, 1)
    } else {
        console.warn("Failed to delete 'local' for update function.");
    }
    return node
}

class CustomPrinter extends tstl.LuaPrinter {
    /**
     * @param {lua.VariableDeclarationStatement} expression
     * @return {SourceNode}
     */
    printVariableDeclarationStatement(expression) {
        let node = super.printVariableDeclarationStatement(expression)
        const exp = expandSourceNode(node)
        if (exp.startsWith("local function update()")) {
            delUpdateLocalFromSourceNode(node)
        }
        return node
    }
}

/** @type {tstl.Plugin} */
module.exports = {
    printer: (program, emitHost, fileName, file) => {
        return new CustomPrinter(emitHost, program, fileName).print(file)
    }
}
