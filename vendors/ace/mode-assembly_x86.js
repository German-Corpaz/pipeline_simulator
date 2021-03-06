define("ace/mode/assembly_x86_highlight_rules", [
  "require",
  "exports",
  "module",
  "ace/lib/oop",
  "ace/mode/text_highlight_rules"
], function(e, t, n) {
  "use strict";
  var r = e("../lib/oop"),
    i = e("./text_highlight_rules").TextHighlightRules,
    s = function() {
      (this.$rules = {
        start: [
          {
            token: "keyword.control.assembly",
            regex:
              "\\b(?:add|sub|mul|div|fpadd|fpsub|fpmul|fpdiv|addi|li|lw|sw|beq|bne|jmp)\\b",
            caseInsensitive: !0
          },
          {
            token: "variable.parameter.register.assembly",
            regex:
              "\\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15)\\b",
            caseInsensitive: !0
          },
          {
            token: "constant.character.decimal.assembly",
            regex: "\\b[0-9]+\\b"
          },
          {
            token: "memory",
            regex: "\\b(?:m|add)\\b",
            caseInsensitive: !0
          }
        ]
      }),
        this.normalizeRules();
    };
  (s.metaData = {
    fileTypes: ["asm"],
    name: "Assembly x86",
    scopeName: "source.assembly"
  }),
    r.inherits(s, i),
    (t.AssemblyX86HighlightRules = s);
}),
  define("ace/mode/folding/coffee", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/folding/fold_mode",
    "ace/range"
  ], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
      i = e("./fold_mode").FoldMode,
      s = e("../../range").Range,
      o = (t.FoldMode = function() {});
    r.inherits(o, i),
      function() {
        (this.getFoldWidgetRange = function(e, t, n) {
          var r = this.indentationBlock(e, n);
          if (r) return r;
          var i = /\S/,
            o = e.getLine(n),
            u = o.search(i);
          if (u == -1 || o[u] != "#") return;
          var a = o.length,
            f = e.getLength(),
            l = n,
            c = n;
          while (++n < f) {
            o = e.getLine(n);
            var h = o.search(i);
            if (h == -1) continue;
            if (o[h] != "#") break;
            c = n;
          }
          if (c > l) {
            var p = e.getLine(c).length;
            return new s(l, a, c, p);
          }
        }),
          (this.getFoldWidget = function(e, t, n) {
            var r = e.getLine(n),
              i = r.search(/\S/),
              s = e.getLine(n + 1),
              o = e.getLine(n - 1),
              u = o.search(/\S/),
              a = s.search(/\S/);
            if (i == -1)
              return (
                (e.foldWidgets[n - 1] = u != -1 && u < a ? "start" : ""), ""
              );
            if (u == -1) {
              if (i == a && r[i] == "#" && s[i] == "#")
                return (
                  (e.foldWidgets[n - 1] = ""),
                  (e.foldWidgets[n + 1] = ""),
                  "start"
                );
            } else if (
              u == i &&
              r[i] == "#" &&
              o[i] == "#" &&
              e.getLine(n - 2).search(/\S/) == -1
            )
              return (
                (e.foldWidgets[n - 1] = "start"),
                (e.foldWidgets[n + 1] = ""),
                ""
              );
            return (
              u != -1 && u < i
                ? (e.foldWidgets[n - 1] = "start")
                : (e.foldWidgets[n - 1] = ""),
              i < a ? "start" : ""
            );
          });
      }.call(o.prototype);
  }),
  define("ace/mode/assembly_x86", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/assembly_x86_highlight_rules",
    "ace/mode/folding/coffee"
  ], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./assembly_x86_highlight_rules").AssemblyX86HighlightRules,
      o = e("./folding/coffee").FoldMode,
      u = function() {
        (this.HighlightRules = s),
          (this.foldingRules = new o()),
          (this.$behaviour = this.$defaultBehaviour);
      };
    r.inherits(u, i),
      function() {
        (this.lineCommentStart = [";"]), (this.$id = "ace/mode/assembly_x86");
      }.call(u.prototype),
      (t.Mode = u);
  });
(function() {
  window.require(["ace/mode/assembly_x86"], function(m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
