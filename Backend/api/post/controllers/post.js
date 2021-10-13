'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async full(ctx) {
        const _posts = await strapi.query("post").find();
        const results = await Promise.all(_posts.map(async _post => {
            let commentIds = _post.comments.map(_co => { return _co._id });
            return {
                ..._post,
                comments: await strapi.query("comment").find({id_in: commentIds}),
            };
        }));
        return { data : results };
    },
    async preview(ctx) {
        const _posts = await strapi.query("post").find();
        const _preview = _posts.map(el => { 
            return {
                author: el.author.username,
                title: el.title,
                content: el.content, 
            };
        });
        return { data : _preview };
    },
};
