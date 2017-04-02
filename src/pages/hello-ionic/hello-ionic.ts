import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import * as $ from "jquery";
@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

    public materialize: any;

    @ViewChild(Slides) slides: Slides;
    constructor() {

    }

    turn(index) {
      debugger;
        this.slides.slideTo(index - 1);
    }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        let prev_index = this.slides.getPreviousIndex();


        var $this = $('ul.scrollabletabs');
        var $active, $links = $this.find('li.scrollabletab a'),
            $tabs_width = $this.width(),
            $indicator,
            index = prev_index = 0;

        // Finds right attribute for indicator based on active tab.
        // el: jQuery Object
        var calcRightPos = function(el) {
            return $tabs_width - el.position().left - el.outerWidth() - $this.scrollLeft();
        };

        // Finds left attribute for indicator based on active tab.
        // el: jQuery Object
        var calcLeftPos = function(el) {
            return el.position().left + $this.scrollLeft();
        };


        var centerItVariableWidth = function(target, outer) {
            var out = $(outer);
            var tar = $(target);
            var x = out.width();
            var y = tar.outerWidth(true);
            var z = tar.parent().index();
            var q = 0;
            var m = out.find('li');
            //Just need to add up the width of all the elements before our target. 
            for (var i = 0; i < z; i++) {
                q += $(m[i]).outerWidth(true);
            }
            outer.animate({ scrollLeft: Math.max(0, q - (x - y) / 2) }, 800);
            //out.scrollLeft(Math.max(0, q - (x - y)/2));
        }


        // Animates Indicator to active tab.
        // prev_index: Number
        var animateIndicator = function(prev_index) {
            if ((index - prev_index) >= 0) {
                $indicator.animate({ right: calcRightPos($active) }, 100);
                $indicator.animate({ left: calcLeftPos($active) }, 100);
                // $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad' });
                // $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad', delay: 90 });

            } else {
                $indicator.animate({ left: calcLeftPos($active) }, 100);
                $indicator.animate({ right: calcRightPos($active) }, 100);
                // $indicator.velocity({"left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad'});
                // $indicator.velocity({"right": calcRightPos($active) }, {duration: transition, queue: false, easing: 'easeOutQuad', delay: 90});
            }


        };



        $active = $this.find('li.scrollabletab a.active').first();
        index = $links.index($active);
        if (index < 0) {
            index = 0;
        }
        $indicator = $this.find('.indicator');
        $active.removeClass('active');
        $active = $($links[currentIndex]);
        $active.addClass('active');
        animateIndicator(prev_index);
        centerItVariableWidth($active, $active.parent().parent());



    }
}
