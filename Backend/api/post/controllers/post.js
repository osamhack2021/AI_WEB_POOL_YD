'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async full(ctx) {
        const _posts = await strapi.query("post").find();
        const results = await Promise.all(_posts.map(async el => {
            let commentIds = el.comments.map(_co => { return _co._id });
            let comments = await strapi.query("comment").find({id_in: commentIds});
            return {
                id: el.id,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
                publishedAt: el.published_at,
                author: {
                    id: el.author.id,
                    username: el.author.username,
                    profileImageUrl: el.author.thumbnail.url,
                },
                title: el.title,
                content: el.content ? el.content : null,
                previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
                tags: el.tags.map(_tag => _tag.content),
                commentsCount: el.comments.length,
                likesCount: el.likes.length,
                comments: comments.map(_co => {
                    return {
                        id: _co.id,
                        createdAt: _co.createdAt,
                        updatedAt: _co.updatedAt,
                        author: {
                            id: _co.author.id,
                            username: _co.author.username,
                            profileImageUrl: _co.author.thumbnail.url,
                        },
                        content: _co.comment
                    }
                }),
                likes: el.likes.map(_user => { return {
                    id: _user.id,
                    username: _user.username,
                    profileImageUrl: _user.thumbnail.url
                }})
            };
        }));
        return { data : results };
    },
    async findFullOne(ctx) {
        const { id } = ctx.params;
        const el = await strapi.query("post").findOne({id: id});
        const commentIds = el.comments.map(_co => { return _co._id });
        const comments = await strapi.query("comment").find({id_in: commentIds});
        return {
            id: el.id,
            createdAt: el.createdAt,
            updatedAt: el.updatedAt,
            publishedAt: el.published_at,
            author: {
                id: el.author.id,
                username: el.author.username,
                profileImageUrl: el.author.thumbnail.url,
            },
            title: el.title,
            content: el.content ? el.content : null,
            previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
            tags: el.tags.map(_tag => _tag.content),
            commentsCount: el.comments.length,
            likesCount: el.likes.length,
            comments: comments.map(_co => {
                return {
                    id: _co.id,
                    createdAt: _co.createdAt,
                    updatedAt: _co.updatedAt,
                    author: {
                        id: _co.author.id,
                        username: _co.author.username,
                        profileImageUrl: _co.author.thumbnail.url,
                    },
                    content: _co.comment
                }
            }),
            likes: el.likes.map(_user => { return {
                id: _user.id,
                username: _user.username,
                profileImageUrl: _user.thumbnail.url
            }})
        };
    },
    async preview(ctx) {
        const _posts = await strapi.query("post").find();
        const _preview = _posts.map(el => { 
            return {
                id: el.id,
                createdAt: el.createdAt,
                author: {
                    id: el.author.id,
                    username: el.author.username,
                    profileImageUrl: el.author.thumbnail.url,
                },
                title: el.title,
                contentPreview: el.content ? el.content : null,
                previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
                tags: el.tags.map(_tag => _tag.content),
                commentsCount: el.comments.length,
                likesCount: el.likes.length,
            };
        });
        return { data : _preview };
    },
    async findPreviewOne(ctx) {
        const { id } = ctx.params;
        const el = await strapi.query("post").findOne({id : id});
        return {
            id: el.id,
            createdAt: el.createdAt,
            author: {
                id: el.author.id,
                username: el.author.username,
                profileImageUrl: el.author.thumbnail.url,
            },
            title: el.title,
            contentPreview: el.content ? el.content : null,
            previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
            tags: el.tags.map(_tag => _tag.content),
            commentsCount: el.comments.length,
            likesCount: el.likes.length,
        };
    },
    async discover(ctx) {
        const { body } = ctx.request;
        const { target, tags, number } = body;
        let filter1 = [];
        let filter2 = [];
        let filter3 = [];
        let users;
        let posts;
        switch(target) {
            case 'user':
                tags.forEach(tag => {
                    if (tag.subject === "계급") filter1.push(tag.tag);
                    else if (tag.subject === "병과") filter2.push(tag.tag);
                    else filter3.push(tag.tag);
                });
                users = await strapi.query("user", "users-permissions").find();
                users = users.filter(user => {
                    if(user.soldierData) {
                        let e = false;
                        user.tags.forEach(tag => {
                            if (filter3.indexOf(tag.content) > -1) {
                                e = true;
                            };
                        });
                        return (filter1.indexOf(user.soldierData.rank) > -1 || filter1.length === 0)
                        && (filter2.indexOf(user.soldierData.militaryBranch) > -1 || filter2.length === 0)
                        && (e || filter3.length === 0);
                    }
                    return false;
                });
                users = await Promise.all(users.map(async user => {
                    return {
                        id: user.id,
                        username: user.username,
                        birthday: user.birthday,
                        telno: user.telno,
                        location: user.location,
                        email: user.email,
                        summary: user.summary,
                        department: user.soldierData.department,
                        militaryBranch: user.soldierData.militaryBranch,
                        role: user.soldierData.role,
                        profileImageUrl: user.thumbnail.url,
                        postCount: user.posts.length,
                        followersCount: user.followers.length
                    }
                }));
                return { data: users } 
            case 'pool':
                break;
            case 'recruition':
                tags.forEach(tag => {
                    if (tag.subject === "계급 조건") filter1.push(tag.tag);
                    else if (tag.subject === "관련 병과") filter2.push(tag.tag);
                    else filter3.push(tag.tag);
                });
                posts = await strapi.query("post").find();
                posts = posts.filter(post => post.postType === "recruition");
                filter1 = await Promise.all(filter1.map(async el => {
                    switch(el){
                        case "계급 무관": 
                            return "private";
                        case "하사 이상":
                            return "sergeant";
                        case "소위 이상":
                            return "lieutenant";
                        case "소령 이상":
                            return "major";
                        case "준장 이상":
                            return "general";
                    }
                }));
                const isTarget = await Promise.all(posts.map(async post => {
                    let e = false;
                    let relatedBranches = await strapi.query("tag").find({id_in: post.jobInfo.relatedBranches});
                    relatedBranches.forEach(tag => {
                        if (filter2.indexOf(tag.content) > -1) {
                            e = true;
                        }
                    });
                    let group = await strapi.query("tag").findOne({id: post.jobInfo.group});
                    const result = (filter1.indexOf(post.jobInfo.minRank) > -1 || filter1.length === 0)
                        && (e || filter2.length === 0)
                        && (filter3.indexOf(group.content) > -1 || filter3.length === 0);
                    return result;
                }));
                posts = posts.filter((post, idx) => {
                    return isTarget[idx];
                })
                posts = await Promise.all(posts.map(async post => {
                    let _author = await strapi.query("user", "users-permissions").findOne({id: post.author.id});
                    let url = _author.thumbnail.url;  
                    return {
                        id: post.id,
                        author: {
                            id: post.author.id,
                            username: post.author.username,
                            profileImageUrl: url,
                        },
                        title: post.title,
                        employmentType: post.jobInfo.employmentType,
                        pay: post.jobInfo.pay,
                        due: post.jobInfo.due
                    }
                }))
                return { data : posts };
        }
    },
    async test(ctx) {
        let posts = await strapi.query("post").model.find().in("postType", ["general"]);
        console.log(posts);
        return 'hi';
    }
};
