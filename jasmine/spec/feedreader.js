/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
const feed = document.querySelector('.feed');
const body = document.querySelector('body');
const menuIcon = document.querySelector('.menu-icon-link');
const entryLink = document.querySelector('.entry-link');


$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.  
         * We do this by making sure that the url is defined and
         * that its length is greater than 0. */
        it('have urls', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });



        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. It uses the same concepts
         * as the previous test.
         */
        it('have names', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });




    /* Menu Test Suite */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. It does this by testing
         * that the body contains the 'menu-hidden' class.
         */

        it('menu hidden by default', function() {
            let bodyclass = body.className;
            expect(body.className).toContain("menu-hidden");
        });


        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. It register
         * a click and then tests whether the 'menu-hidden' 
         * class was removed from the body. Then it register
         * another click and tests whether the 'menu-hidden' class
         * has been put back. 
         */

        //
        it('menu changes visibilty when the menu icon is clicked', function() {
            menuIcon.click();
            expect(body.className).not.toContain("menu-hidden");

            menuIcon.click();
            expect(body.className).toContain("menu-hidden");

        });
    });

    /* "Initial Entries" Test Suite */

    describe('The menu', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * We do this by loading the beforeEach function since this is
         * asynchronous and then making sure the length of the div
         * with the entry-link class within the div with the feed class
         * has some length to it. 
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("there is at least a single .entry element witin .feed container", function() {

            expect($('.feed .entry-link').length).toBeGreaterThan(0);
        });
    });


    /* "New Feed Selection" Test Suite */

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * We accomplish this by defining the old feed, loading the new feed,
     * defining the new feed, and then testing that the old feed does not
     * equal the new feed.
     */

    describe('New Feed Selection', function() {

        var oldFeed;
        beforeEach(function() {

            loadFeed(0, function() {

               oldFeed = feed.innerHTML;


                loadFeed(1, function() {



                    done();

                });

            });

        });

        it('the feeds are different and content changes', function() {
            var newFeed = feed.innerHTML;
            expect(oldFeed).not.toEqual(newFeed);

        });

    });

}());