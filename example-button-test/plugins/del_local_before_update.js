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
 * @param {string} name 
 * @return {SourceNode}
 */
 const delLocalFromSourceNode = (node, name) => {
    const strLocal = expandSourceNode(node.children?.[0])
    if (strLocal.trimEnd() === "local") {
        node.children.splice(0, 1)
    } else {
        console.warn(`Failed to delete 'local' for update function.`);
    }
    return node
}

/**
 * @param {SourceNode} node 
 * @param {string} name 
 * @return {SourceNode}
 */
 const delLocalForFunction = (node, name) => {
    const exp = expandSourceNode(node)
    if (exp.startsWith(`local function ${name}(`)) {
        return delLocalFromSourceNode(node, name)
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
        node = delLocalForFunction(node, "update")
        node = delLocalForFunction(node, "eventChannel1")
        node = delLocalForFunction(node, "eventChannel2")
        node = delLocalForFunction(node, "eventChannel3")
        node = delLocalForFunction(node, "eventChannel4")
        return node
    }
}

/** @type {tstl.Plugin} */
module.exports = {
    printer: (program, emitHost, fileName, file) => {
        return new CustomPrinter(emitHost, program, fileName).print(file)
    }
}
