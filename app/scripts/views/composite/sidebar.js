/*global define */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    /**
     * Basic stuff for sidebars views
     */
    var View = {

        itemViewContainer: '.main',

        itemViewOptions: {},

        keyboardEvents: {
            'j'   :  'navigateBottom',
            'k'   :  'navigateTop',
            'c'   :  'toCreate',
            'g f' :  'showFavorites',
            'g t' :  'showTrashed',
            'g i' :  'showInbox',
            'g n' :  'toNotebook'
        },

        /**
         * Focus on search form
         */
        focusSearch: function(e) {
            e.preventDefault();
            this.ui.searchInput.focus();
        },

        /**
         * Redirects to search page
         */
        toSearch: function (e) {
            e.preventDefault();
            var text = this.ui.searchInput.val();
            return Backbone.history.navigate('/note/search/' + text + '/p1', true);
        },

        /**
         * Redirects to notebooks list page
         */
        toNotebook: function () {
            return Backbone.history.navigate('/notebooks', true);
        },

        /**
         * Redirects to favorite notes page
         */
        showFavorites: function() {
            return Backbone.history.navigate('/note/favorite/p1', true);
        },

        /**
         * Redirects to Inbox page, index page
         */
        showInbox: function() {
            return Backbone.history.navigate('/note/0/p1', true);
        },

        /**
         * Notes which has been removed to trash
         */
        showTrashed: function() {
            return Backbone.history.navigate('/note/trashed/p1', true);
        },

        /**
         * Redirects to note creating page
         */
        toCreate: function (e) {
            e.preventDefault();
            return Backbone.history.navigate('/note/add', true);
        },

        /**
         * Redirects to previous pagination page
         */
        navigateTop: function () {
            return this.nextOrPrev('prev');
        },

        /**
         * Redirects to next pagination page
         */
        navigateBottom: function () {
            return this.nextOrPrev('next');
        },

        nextOrPrev: function (n) {
            var active, url = '/', id, note, i, prev;

            // Active note
            active = this.$el.find('.list-group-item.active');
            id = active.attr('data-id');
            note = this.collection.get(id);
            i = this.collection.indexOf(note);

            if ((i + 1) === this.perPage && n === 'next') {
                url = this.ui.nextPage.attr('href');
            } else if (i === 0 && n === 'prev') {
                url = this.ui.prevPage.attr('href');
            } else {
                if (n === 'prev') {
                    i = (i > 0) ? i - 1 : 0;
                } else {
                    i = (i === (this.collection.length - 1)) ? i : i + 1;
                }

                prev = this.collection.at(i);
                url = this.urlPage + '/p' + this.lastPage + '/show/' + prev.get('id');
            }

            Backbone.history.navigate(url, true);
        }

    };

    return View;
});