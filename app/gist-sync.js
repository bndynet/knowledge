const fs = require('fs-extra');
const path = require('path');
const octokit = require('@octokit/rest')();
const https = require('https');

const githubUser = 'bndynet';
const wikiFolder = './_wiki/content';
const blogFolder = './_posts';
const blogTemplate = `---
layout: page
title:  "%description%"
teaser: "%teaser%"
breadcrumb: true
categories:
    - Gists
author: Bendy Zhang
---

%content%

`;

fs.removeSync(wikiFolder);
fs.ensureDir(wikiFolder).then(() => {
    console.log('The folder is ready for wiki.');
});

fs.removeSync(blogFolder);
fs.ensureDir(blogFolder).then(() => {
    console.log('The folder is ready for blog.');
});

octokit.gists.getForUser({
    username: githubUser,
}).then(({data}) => {
    for (gist of data) {
        for (const key in gist.files) {
            if (!gist.files.hasOwnProperty(key)) {
                continue;
            }

            const file = gist.files[key];
            const filename = file.filename;
            const fileurl = file.raw_url;

            // for blog
            const dt = gist.created_at.split('T')[0];
            const blogFilename = dt + '-' + filename;
            const blogFilepath = path.join(blogFolder, blogFilename);
            // for wiki
            const wikiFilepath = path.join(wikiFolder, filename);

            let filecontent = '';
            let blogContent = blogTemplate;
            for (const key in gist) {
                blogContent = blogContent.replace('%' + key + '%', gist[key]);
            }

            if (fileurl) {
                // request gist content
                console.log('Request gist content for `' + gist.description + '` (' + fileurl + ') ...');
                https.get(fileurl, (res) => {
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        filecontent += chunk;
                    });
                    res.on('end', () => {
                        if (filename.endsWith('.md')) {
                            // wiki
                            fs.writeFile(wikiFilepath, filecontent, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });

                            // blog
                            blogContent = blogContent.replace('%content%', filecontent);
                            // replace teaser
                            var firstline = filecontent.trim().split('\n')[0] || '';
                            blogContent = blogContent.replace('%teaser%', firstline.replace(/#/g, '').trim());

                            // write file
                            fs.writeFile(blogFilepath, blogContent, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    });
                });
            }
        }
    }
});