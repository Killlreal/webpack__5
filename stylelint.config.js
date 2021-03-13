module.exports = {
    extends: ["stylelint-config-rational-order"],
    plugins: ["stylelint-order", "stylelint-scss"],
    rules: {
        "indentation": 4,
        "string-quotes": "single",
        "no-duplicate-selectors": true,
        "color-hex-case": "lower",
        "color-hex-length": "short",
        "color-named": "never",
        "selector-no-qualifying-type": true,
        "selector-combinator-space-after": "always",
        "selector-attribute-quotes": "always",
        "selector-attribute-operator-space-before": "always",
        "selector-attribute-operator-space-after": "always",
        "selector-attribute-brackets-space-inside": "always",
        "declaration-block-trailing-semicolon": "always",
        "declaration-colon-space-before": "never",
        "declaration-colon-space-after": "always",
        "number-leading-zero": "never",
        "function-url-quotes": "always",
        "font-weight-notation": "numeric",
        "font-family-name-quotes": "always-where-recommended",
        "comment-whitespace-inside": "always",
        "comment-empty-line-before": "always",
        "at-rule-no-vendor-prefix": true,
        "rule-empty-line-before": "always-multi-line",
        "selector-pseudo-element-colon-notation": "double",
        "selector-pseudo-class-parentheses-space-inside": "always",
        "selector-no-vendor-prefix": true,
        // "selector-no-universal": true,
        // "selector-no-type": true,
        "media-feature-range-operator-space-before": "always",
        "media-feature-range-operator-space-after": "always",
        "media-feature-parentheses-space-inside": "always",
        "media-feature-name-no-vendor-prefix": true,
        "media-feature-colon-space-before": "never",
        "media-feature-colon-space-after": "always"
    }
};