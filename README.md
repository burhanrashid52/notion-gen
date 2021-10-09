# Notion Gen
![Version](https://img.shields.io/badge/Version-v.0.0.2-blue.svg)

![Screenshot 2021-10-02 at 11 47 35 AM](https://user-images.githubusercontent.com/14251963/136645327-82d97db8-4a5d-414a-b80c-ef77aed85224.png)

Notion CLI utility for generate pages using [notion api](https://developers.notion.com/reference/intro).

## What problem does this solve ?

Last year I started bullet journaling in notion. So if I want to plan something for a week or month then I need to
create pages with date name and set each date manually in the Date column. This was a repetitive and boring task for me
hence I create this CLI utility.

## Installation

```bash
npm install @burhanrashid52/notion-gen@0.0.2
```

## Commands

### Setup

First, use init command to setup your [notion secret token](https://developers.notion.com/docs#getting-started). It's
save token locally.

```bash
notion-gen init
```

### Generate Dates

```bash
notion-gen generate-dates <startDate> <endDate>
```

To generate dates we need to provide dates in `yyyy-mm-dd` format. After running this command it will ask for databaseid
and date column name.

https://user-images.githubusercontent.com/14251963/136660451-c8641bf1-2e07-49f2-ae4e-50f0357f237e.mp4

## Contribute

If you have a use-case which you want to add to this utility then please [create the discussion](https://github.com/burhanrashid52/notion-gen/discussions/new), and then you can create a PR for it.

## Questions?🤔
Hit me on twitter [![Twitter](https://img.shields.io/badge/Twitter-%40burhanrashid52-blue.svg)](https://twitter.com/burhanrashid52)
[![Medium](https://img.shields.io/badge/Instagram-%40burhanrashid52-brightgreen.svg)](https://instagram.com/burhanrashid52)
[![Facebook](https://img.shields.io/badge/Facebook-Burhanuddin%20Rashid-blue.svg)](https://www.facebook.com/Bursid)

## MIT License

Copyright (c) 2021 Burhanuddin Rashid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
