/**
 * Copyright (c) 2016 Shawn Dellysse
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const PROPERTY_NAME = "crystalize-access-log.start-time";

module.exports = {
    name: "access-log",
    before: {
        name: "access-log:before",
        respondsTo: "then",
        callback: (req, res) => {
            req[PROPERTY_NAME] = process.hrtime();
        },
    },
    after: {
        name: "access-log:after",
        respondsTo: "then",
        callback: (req, res) => {
            const duration = process.hrtime(req[PROPERTY_NAME]);
            console.log(`${ req.method } ${ req.path } (${ res.statusCode }): ${ duration[0] }s ${ duration[1] / 1000000 }ms`);
        },
    },
};
