/* global define */
define([
    'underscore',
    'modules',
    'backbone.radio',
    'mathjax',
    'modules/mathjax/libs/mathjax'
], function(_, Modules, Radio, MathJax, math) {
    'use strict';

    /**
     * MathJax module. Renders MathJax.
     */
    var MathjaxModule = Modules.module('MathjaxModule', {});

    // Configure MathJax
    MathJax.Hub.Config({
        jax     : ['input/TeX', 'output/HTML-CSS'],
        tex2jax : {
            inlineMath     : [['$', '$'], ['\\(', '\\)']],
            displayMath    : [['$$', '$$'], ['\\(', '\\)']],
            processEscapes : true
        }
    });

    /**
     * Initializers & finalizers of the module
     */
    MathjaxModule.on('start', function(view) {
        // Render MathJax on start
        math.render(view);

        // Re-render MathJax every time when preview is refreshed.
        Radio.on('editor', 'preview:refresh', _.debounce(math.render, 350), math);
    });

    MathjaxModule.on('stop', function() {
        delete math.view;
        Radio.off('editor', 'preview:refresh');
    });

    /**
     * Start listening to events.
     */
    Radio.command('init', 'add', 'module', function() {
        Radio.on('editor', 'converter:init', math.onInitConverter, math);

        // When a note is shown, start this module
        Radio.on('noteView', {
            'view:render'  : MathjaxModule.start,
            'view:destroy' : MathjaxModule.stop
        }, MathjaxModule);

        // When an editor view is shown, start this module
        Radio.on('editor', {
            'view:render'  : MathjaxModule.start,
            'view:destroy' : MathjaxModule.stop
        }, MathjaxModule);
    });

    return MathjaxModule;
});