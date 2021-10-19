'use strict';

const { sanitizeEntity } = require("strapi-utils");
const http = require("http");
const request = require("request");
require("dotenv").config({ path: "../../../.env" });

function getResult(options){
    return new Promise(resolve => {
        request.post(options, (err, res, body) => {
            console.log(err);
            resolve(body);
        });
    });
}

module.exports = {
    async full(ctx) {
        const _posts = await strapi.query("post").find();
        const results = await Promise.all(_posts.map(async el => {
            let commentIds = el.comments.map(_co => { return _co._id });
            let comments = await strapi.query("comment").find({id_in: commentIds});
            let relatedBranches;
            let group;
            let minRank;
            if(el.postType === "recruition"){
                relatedBranches = await strapi.query("tag").find({id_in : el.jobInfo.relatedBranches});
                relatedBranches = relatedBranches.map(el => el.content);
                group = await strapi.query("tag").findOne({id: el.jobInfo.group});
                group = group.content;
                switch(el.jobInfo.minRank){
                    case "private": 
                        minRank = "계급 무관";
                        break;
                    case "sergeant":
                        minRank = "하사 이상";
                        break;
                    case "lieutenant":
                        minRank = "소위 이상";
                        break;
                    case "major":
                        minRank = "소령 이상";
                        break;
                    case "general":
                        minRank = "준장 이상";
                        break;
                }
            }
            return {
                id: el.id,
                postType: el.postType,
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
                        content: _co.content
                    }
                }),
                likes: el.likes.map(_user => { return {
                    id: _user.id,
                    username: _user.username,
                    profileImageUrl: _user.thumbnail.url
                }}),
                jobInfo: el.jobInfo ? {
                    id: el.jobInfo.id,
                    desc: el.jobInfo.desc,
                    employmentType: el.jobInfo.employmentType,
                    due: el.jobInfo.due,
                    minRank,
                    relatedBranches,
                    group
                } : null
            };
        }));
        return { data : results };
    },
    async findFullOne(ctx) {
        const { id } = ctx.params;
        const el = await strapi.query("post").findOne({id: id});
        const commentIds = el.comments.map(_co => { return _co._id });
        const comments = await strapi.query("comment").find({id_in: commentIds});
        let relatedBranches;
        let group;
        let minRank;
        if(el.postType === "recruition"){
            relatedBranches = await strapi.query("tag").find({id_in : el.jobInfo.relatedBranches});
            relatedBranches = relatedBranches.map(el => el.content);
            group = await strapi.query("tag").findOne({id: el.jobInfo.group});
            group = group.content;
            switch(el.jobInfo.minRank){
                case "private": 
                    minRank = "계급 무관";
                    break;
                case "sergeant":
                    minRank = "하사 이상";
                    break;
                case "lieutenant":
                    minRank = "소위 이상";
                    break;
                case "major":
                    minRank = "소령 이상";
                    break;
                case "general":
                    minRank = "준장 이상";
                    break;
            }
        }
        return {
            id: el.id,
            postType: el.postType,
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
                    content: _co.content
                }
            }),
            likes: el.likes.map(_user => { return {
                id: _user.id,
                username: _user.username,
                profileImageUrl: _user.thumbnail.url
            }}),
            jobInfo: el.jobInfo ? {
                id: el.jobInfo.id,
                desc: el.jobInfo.desc,
                employmentType: el.jobInfo.employmentType,
                due: el.jobInfo.due,
                minRank,
                relatedBranches,
                group
            } : null
        };
    },
    async preview(ctx) {
        const _posts = await strapi.query("post").find();
        const _preview = await Promise.all(_posts.map(async el => {
            let relatedBranches;
            let group;
            let minRank;
            if(el.postType === "recruition"){
                relatedBranches = await strapi.query("tag").find({id_in : el.jobInfo.relatedBranches});
                relatedBranches = relatedBranches.map(el => el.content);
                group = await strapi.query("tag").findOne({id: el.jobInfo.group});
                group = group.content;
                switch(el.jobInfo.minRank){
                    case "private": 
                        minRank = "계급 무관";
                        break;
                    case "sergeant":
                        minRank = "하사 이상";
                        break;
                    case "lieutenant":
                        minRank = "소위 이상";
                        break;
                    case "major":
                        minRank = "소령 이상";
                        break;
                    case "general":
                        minRank = "준장 이상";
                        break;
                }
            }
            return {
                id: el.id,
                postType: el.postType,
                createdAt: el.createdAt,
                author: {
                    id: el.author.id,
                    username: el.author.username,
                    profileImageUrl: el.author.thumbnail.url,
                },
                title: el.title,
                contentPreview: el.content ? el.content.replace(/<[^>]*>?/gm, '').slice(0,240) + "..." : null,
                previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
                tags: el.tags.map(_tag => _tag.content),
                commentsCount: el.comments.length,
                likesCount: el.likes.length,
                jobInfo: el.jobInfo ? {
                    id: el.jobInfo.id,
                    desc: el.jobInfo.desc,
                    employmentType: el.jobInfo.employmentType,
                    due: el.jobInfo.due,
                    minRank,
                    relatedBranches,
                    group
                } : null
            };
        }));
        return { data : _preview };
    },
    async findPreviewOne(ctx) {
        const { id } = ctx.params;
        const el = await strapi.query("post").findOne({id : id});
        let relatedBranches;
        let group;
        let minRank;
        if(el.postType === "recruition"){
            relatedBranches = await strapi.query("tag").find({id_in : el.jobInfo.relatedBranches});
            relatedBranches = relatedBranches.map(el => el.content);
            group = await strapi.query("tag").findOne({id: el.jobInfo.group});
            group = group.content;
            switch(el.jobInfo.minRank){
                case "private": 
                    minRank = "계급 무관";
                    break;
                case "sergeant":
                    minRank = "하사 이상";
                    break;
                case "lieutenant":
                    minRank = "소위 이상";
                    break;
                case "major":
                    minRank = "소령 이상";
                    break;
                case "general":
                    minRank = "준장 이상";
                    break;
            }
        }
        return {
            id: el.id,
            postType: el.postType,
            createdAt: el.createdAt,
            author: {
                id: el.author.id,
                username: el.author.username,
                profileImageUrl: el.author.thumbnail.url,
            },
            title: el.title,
            contentPreview: el.content ? el.content.replace(/<[^>]*>?/gm, '').slice(0,240) + "..." : null,
            previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
            tags: el.tags.map(_tag => _tag.content),
            commentsCount: el.comments.length,
            likesCount: el.likes.length,
            jobInfo: el.jobInfo ? {
                id: el.jobInfo.id,
                desc: el.jobInfo.desc,
                employmentType: el.jobInfo.employmentType,
                due: el.jobInfo.due,
                minRank,
                relatedBranches,
                group
            } : null
        };
    },
    async discover(ctx) {
        const { body } = ctx.request;
        const { type } = body;
        if (type === "discover") {
            const { target, tags } = body;
            let filter1 = [];
            let filter2 = [];
            let filter3 = [];
            let users;
            let pools;
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
                    tags.forEach(tag => {
                        if (tag.subject === "관심 병과") filter1.push(tag.content);
                        else filter2.push(tag.content);
                    });
                    pools = await strapi.query("pool").find();
                    pools = pools.filter(pool => {
                        let e1 = false;
                        let e2 = false;
                        const _tags = pool.tags.map(_tag => _tag.content);
                        _tags.forEach(_tag => {
                            if (filter1.indexOf(_tag) > -1) e1 = true;
                        });
                        _tags.forEach(_tag => {
                            if (filter2.indexOf(_tag) > -1) e2 = true;
                        });
                        return (e1 || filter1.length === 0) && (e2 || filter2.length === 0);
                    });
                    pools = pools.map(pool => {
                        return {
                            id: pool.id,
                            name: pool.name,
                            summary: pool.summary,
                            tags: pool.tags.map(tag => tag.content),
                            memberCount: pool.members.length,
                            imageUrl: pool.image.url
                        };
                    });
                    return { data: pools };
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
                    });
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
                    }));
                    return { data : posts };
            }
        } else if (type === "recommend") {
            const { userID } = body;
            const user = await strapi.query("user", "users-permissions").findOne({id: userID});
            let followingPosts = [];
            await Promise.all(user.followings.map(async following => {
                const _following = await strapi.query("user", "users-permissions").findOne({id: following.id});
                const posts = _following.posts.filter(post => post.postType !== "pool");
                followingPosts = followingPosts.concat(posts);
                return 0;
            }));
            let poolPosts = [];
            await Promise.all(user.pools.map(async pool => {
                const targetPool = await strapi.query("pool").findOne({id: pool.id});
                poolPosts = poolPosts.concat(targetPool.posts);
            }));
            let feedPosts = followingPosts.concat(poolPosts);
            const userEmbedding = user.embedding ? user.embedding.data : null;
            const postEmbeddingList = feedPosts.map(feed => (feed.embedding ? feed.embedding.data : null));
            const _request = {
                request: "rankRelevantPosts",
                rankRelevantPostsData: {
                    userEmbedding,
                    postEmbeddingList
                }
            }
            const options = {
                uri: process.AI_URL,
                method: "POST",
                body: _request,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.AI_KEY}`,
                },
                json: true
            };
            const data = await getResult(options);
            const { index } = data;
            feedPosts = feedPosts.map((feed, idx) => feedPosts[index[idx]]);
            feedPosts = await Promise.all(feedPosts.map(async _el => {
                const el = await strapi.query("post").findOne({id: _el.id});
                let relatedBranches;
                let group;
                let minRank;
                if(el.postType === "recruition"){
                    relatedBranches = await strapi.query("tag").find({id_in : el.jobInfo.relatedBranches});
                    relatedBranches = relatedBranches.map(el1 => el1.content);
                    group = await strapi.query("tag").findOne({id: el.jobInfo.group});
                    group = group.content;
                    switch(el.jobInfo.minRank){
                        case "private": 
                            minRank = "계급 무관";
                            break;
                        case "sergeant":
                            minRank = "하사 이상";
                            break;
                        case "lieutenant":
                            minRank = "소위 이상";
                            break;
                        case "major":
                            minRank = "소령 이상";
                            break;
                        case "general":
                            minRank = "준장 이상";
                            break;
                    }
                }
                return {
                    id: el.id,
                    postType: el.postType,
                    createdAt: el.createdAt,
                    author: {
                        id: el.author.id,
                        username: el.author.username,
                        profileImageUrl: el.author.thumbnail.url,
                    },
                    title: el.title,
                    contentPreview: el.content ? el.content.replace(/<[^>]*>?/gm, '').slice(0,240) + "..." : null,
                    previewMainImageUrl: el.images.length>0 ? el.images[0].url : null,
                    tags: el.tags.map(_tag => _tag.content),
                    commentsCount: el.comments.length,
                    likesCount: el.likes.length,
                    jobInfo: el.jobInfo ? {
                        id: el.jobInfo.id,
                        desc: el.jobInfo.desc,
                        employmentType: el.jobInfo.employmentType,
                        due: el.jobInfo.due,
                        minRank,
                        relatedBranches,
                        group
                    } : null
                };
            }));
            return feedPosts;
        }
    },
    async test(ctx) {
        const { id } = ctx.params;
        console.log(process.env.AI_URL);
        if (id !== "all") {
            let post = await strapi.query("post").findOne({id: id});
            let { postType, author, title, content, jobInfo } = post;
            if (content) {
                content.replace(/<[^>]*>?/gm, '');
            } else {
                content = "";
            }
            if (postType === "recruition") {
                jobInfo = await strapi.query("job-info").findOne({id: jobInfo.id});
                let { desc, pay, employmentType, due, minRank, relatedBranches, group } = jobInfo;
                switch(minRank){
                    case "private": 
                        minRank = "계급 무관";
                        break;
                    case "sergeant":
                        minRank = "하사 이상";
                        break;
                    case "lieutenant":
                        minRank = "소위 이상";
                        break;
                    case "major":
                        minRank = "소령 이상";
                        break;
                    case "general":
                        minRank = "준장 이상";
                        break;
                }
                content = content.concat(" ", jobInfo.desc, " ", employmentType, " ", due, " ", minRank, " ", group.content, " ");
                relatedBranches.forEach(tag => { content.concat(tag.content) });
            }
            author = await strapi.query("user", "users-permissions").findOne({id: author.id});
            const userEmbedding = author.embedding ? author.embedding.data : null;
            const _request = {
                // 요청하는 작업 종류. 현재 3가지 지원
                request: "createPost",
                
                // 포스트 생성 시 벡터 임베딩 요청. (create 시나리오만 다룸)
                createPostData: {
                    content, 
                    userEmbedding, // 사용자의 벡터 임베딩. 초기 None
                    userNPosts: author.posts.length, // 사용자의 포스트 개수 (현재 등록 포스트 포함)
                },
            };
            const options = {
                uri: process.env.AI_URL,
                method: "POST",
                body: _request,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.AI_KEY}`,
                },
                json: true
            };
            const data = await getResult(options);
            author = {
                ...author,
                embedding: {
                    data: data.userEmbedding,
                }
            };
            post = {
                ...post,
                embedding: {
                    data: data.postEmbedding,
                }
            };
            author = await strapi.query("user", "users-permissions").update({id: author.id}, author);
            post = await strapi.query("post").update({id: post.id}, post);
            return { author, post };
        } else {
            const posts = await strapi.query("post").find();
            const users = await strapi.query("user", "users-permissions").find();
            // 초기화 
            await Promise.all(users.map(async user => {
                const _user = {
                    ...user,
                    embedding: null
                };
                await strapi.query("user", "users-permissions").update({id: user.id}, _user);
                return _user;
            }));
            await Promise.all(posts.map(async post => {
                const _post = {
                    ...post,
                    embedding: null
                };
                await strapi.query("post").update({id: post.id}, _post);
                return _post;
            }));
            // embedding 값 feed
            await Promise.all(posts.map(async _post => {
                let post = await strapi.query("post").findOne({id: _post.id});
                let { postType, author, title, content, jobInfo } = post;
                if (content) {
                    content = content.replace(/<[^>]*>?/gm, '');
                } else {
                    content = "";
                }
                if (postType === "recruition") {
                    jobInfo = await strapi.query("job-info").findOne({id: jobInfo.id});
                    let { desc, pay, employmentType, due, minRank, relatedBranches, group } = jobInfo;
                    switch(minRank){
                        case "private": 
                            minRank = "계급 무관";
                            break;
                        case "sergeant":
                            minRank = "하사 이상";
                            break;
                        case "lieutenant":
                            minRank = "소위 이상";
                            break;
                        case "major":
                            minRank = "소령 이상";
                            break;
                        case "general":
                            minRank = "준장 이상";
                            break;
                    }
                    content = content.concat(" ", jobInfo.desc, " ", employmentType, " ", due, " ", minRank, " ", group.content, " ");
                    relatedBranches.forEach(tag => { content.concat(tag.content) });
                }
                author = await strapi.query("user", "users-permissions").findOne({id: author.id});
                const userEmbedding = author.embedding ? author.embedding.data : null;
                const _request = {
                    // 요청하는 작업 종류. 현재 3가지 지원
                    request: "createPost",
                    
                    // 포스트 생성 시 벡터 임베딩 요청. (create 시나리오만 다룸)
                    createPostData: {
                        content, 
                        userEmbedding, // 사용자의 벡터 임베딩. 초기 None
                        userNPosts: author.posts.length, // 사용자의 포스트 개수 (현재 등록 포스트 포함)
                    },
                };
                
                const options = {
                    uri: process.env.AI_URL,
                    method: "POST",
                    body: _request,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${process.env.AI_KEY}`,
                    },
                    json: true
                };
                const data = await getResult(options);
                author = {
                    ...author,
                    embedding: {
                        data: data.userEmbedding,
                    }
                };
                post = {
                    ...post,
                    embedding: {
                        data: data.postEmbedding,
                    }
                };
                
                author = await strapi.query("user", "users-permissions").update({id: author.id}, author);
                post = await strapi.query("post").update({id: post.id}, post);
                return true;
            }));
            
            return "done";
        }
    },
};
