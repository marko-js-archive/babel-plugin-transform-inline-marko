var marko = require('marko/compiler');
var babylon = require('babylon');

module.exports = (babel) => ({
    visitor: {
        Program: {
            enter() {},
            exit(path) {
                var compiler = path.markoCompiler;
                var staticCode = compiler && compiler.staticCode;
                var staticNodes = staticCode && babylon.parse(staticCode).program.body;
                if(staticNodes) {
                    path.node.body = staticNodes.concat(path.node.body);
                }
            }
        },
        TaggedTemplateExpression(path, state) {
            if(path.node.tag.name !== 'marko') {
                return;
            }

            var filename = state.file.opts.filename;
            var code = state.file.code;
            var start = path.node.quasi.start;
            var end = path.node.quasi.end;
            var templateSrc = code.slice(start+1, end-1);
            var ancestry = path.getAncestry();
            var program = ancestry[ancestry.length-1];
            var compiler = program.markoCompiler = program.markoCompiler || marko.createInlineCompiler(filename);
            var compiledSrc = compiler.compile(templateSrc).code;

            path.replaceWithSourceString(compiledSrc);

        }
    }
});