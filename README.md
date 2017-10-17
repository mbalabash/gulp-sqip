**gulp-sqip**
=============

A simple plugin for generate svg placeholders from images.

This plugin used **sqip** (see https://github.com/technopagan/sqip)

## Overview
SVG-Based Image Placeholder

![Demo results](demo/demo.png)

## Requirements
    Golang (https://golang.org/doc/install)
    Primitive (https://github.com/fogleman/primitive)
    
## Installation 
    npm install @mbalabash/gulp-sqip
    
## Usage
    const gsqip = require('@mbalabash/gulp-sqip');
    gulp.task('generate-svg-placeholders', function(){
        gulp.src(['./img/test.png', './img/test.jpeg', './img/test.jpg'])
        .pipe(gsqip({
            numberOfPrimitives: 12 //optional parameter (default: 22)
        }))
        .pipe(gulp.dest('./img'));
    });
  
## Contributing
Contributions are always welcome, no matter how large or small.

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Credits
Tobias Baldauf (https://github.com/technopagan)
