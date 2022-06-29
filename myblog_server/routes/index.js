import express from 'express'
const router = express.Router({})

import conn from './../db/db'
import config from '../src/config'
import sms_util from './../util/sms_util'

import svgCaptcha from 'svg-captcha'
import md5 from 'blueimp-md5'
import formidable from 'formidable'
import { basename } from 'path'
import Token from '../util/jwt'

const S_KEY = '1373325137@qq.com'; // 盐
const users = {}; // 用户信息
const token = require('../util/jwt')

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(md5(md5("admin") + S_KEY))
    res.render('index', { title: '网上订餐' });
});

/**************************************** 前台商城 ****************************************** */
/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res) => {
    let sqlStr = 'SELECT * FROM homecasual';
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ code: 0, message: '请求轮播图数据失败' });
            console.log(error);
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});

/**
 * 获取博客分类
 */
router.get('/api/flags', (req, res) => {
    let sqlStr = 'SELECT * FROM flags';
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ code: 0, message: '请求博客分类数据失败' });
            console.log(error);
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});

/**
 * 模糊搜索(全局))
 */
router.post('/api/search', (req, res) => {
    // 获取参数
    let pageNo = req.body.pageNo || 1;
    let pageSize = req.body.pageSize || 5;
    let keywords = req.body.keywords;
    console.log(keywords);
    keywords = keywords.replace(/\s+/g, ' ');
    keywords = keywords.replace(/(^\s*)|(\s*$)/g, '');
    let keyArr = keywords.split(' ');
    let questionsql = 'SELECT question.id,question.title,type,question.creatime,question.comments,profile,user.nickname,articletype.decription FROM question,user,articletype WHERE question.state = 0 and user.id = question.uploaduser and question.type = articletype.id and (question.profile LIKE ';
    let lifesql = ' SELECT life.id,life.title,type,life.creatime,life.comments,profile,user.nickname,articletype.decription FROM life,user,articletype WHERE life.state = 0 and user.id = life.uploaduser and life.type = articletype.id and (life.profile LIKE ';
    let sqlStr = 'SELECT blogs.id,blogs.title,type,blogs.creatime,blogs.comments,profile,user.nickname,articletype.decription FROM blogs,user,articletype WHERE blogs.state = 0 and user.id = blogs.uploaduser and blogs.type = articletype.id and (blogs.profile LIKE ';  // sql语句
    console.log(sqlStr);
    keyArr.forEach((item, index, arr) => {
        sqlStr += "'%" + item + "%'" + ' OR blogs.title LIKE ' + "'%" + item + "%'";
        console.log(sqlStr);
        questionsql += "'%" + item + "%'" + " OR question.title LIKE " + "'%" + item + "%'";
        lifesql += "'%" + item + "%'" + " OR life.title LIKE " + "'%" + item + "%'";
        if (index != arr.length - 1) {
            sqlStr += " OR blogs.profile LIKE ";
            questionsql += " OR question.profile LIKE ";
            lifesql += " OR life.profile LIKE ";
        }
    });
    sqlStr += ")",
        questionsql += ")",
        lifesql += ")",
        sqlStr = sqlStr + ' union ' + questionsql + ' union ' + lifesql + ' order by id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
    console.log(sqlStr);
    conn.query(sqlStr, (error, results, fields) => {
        results = JSON.parse(JSON.stringify(results));
        if (!error && results.length) {
            res.json({ code: 200, message: results });
        } else {
            res.json({ code: 400, message: results });
        }
    });
});

/**
 * 获取博客列表
 *  1, 3
 */
router.get('/api/getbloglist', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 5;

    let sqlStr = 'SELECT blogs.comments, blogs.creatime, blogs.flag, blogs.id, blogs.title, blogs.profile, type, user.nickname, articletype.decription FROM blogs,user,articletype WHERE blogs.state = 0 and user.id = blogs.uploaduser and blogs.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求商品列表数据失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});

/**
 * 获取问题列表
 *  1, 3
 */
router.get('/api/getqusetionlist', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 5;

    let sqlStr = 'SELECT comments, creatime, flag, question.id, title, profile, type, user.nickname, articletype.decription FROM question,user,articletype WHERE question.state = 0 and user.id = question.uploaduser and question.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求商品列表数据失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});

/**
 * 获取生活列表
 *  1, 3
 */
router.get('/api/getlifelist', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 5;

    let sqlStr = 'SELECT comments, creatime, life.id, title, profile, type, user.nickname, articletype.decription FROM life,user,articletype WHERE life.state = 0 and user.id = life.uploaduser and life.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求生活列表数据失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});

/**
 * 获取表名信息
 */
router.get('/api/gettablename', (req, res) => {
    // 获取参数
    // let data = req.auth.data;
    // console.log(data);

    let type = req.query.type;


    let sqlStr = 'SELECT name FROM articletype WHERE id = ' + type + '';


    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求表名信息失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});


/**
 * 获取所有信息
 */
router.get('/api/getallarticle', (req, res) => {

    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 5;

    let sqlStr = 'SELECT SQL_CALC_FOUND_ROWS blogs.id,blogs.title,type,blogs.creatime,profile,user.nickname,articletype.decription FROM blogs,user,articletype WHERE blogs.state = 0 and user.id = blogs.uploaduser and blogs.type = articletype.id'
        + ' UNION'
        + ' SELECT question.id,question.title,type,question.creatime,profile,user.nickname,articletype.decription FROM question,user,articletype WHERE question.state = 0 and user.id = question.uploaduser and question.type = articletype.id'
        + ' UNION'
        + ' SELECT life.id,life.title,type,life.creatime,profile,user.nickname,articletype.decription FROM life,user,articletype WHERE life.state = 0 and user.id = life.uploaduser and life.type = articletype.id'
        + ' order by id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求文章数据失败' });
        } else {
            let sqltotal = 'select FOUND_ROWS() as total'
            results = JSON.parse(JSON.stringify(results));
            conn.query(sqltotal, (error, row, fields) => {
                if (error) {
                    console.log(error);
                    res.json({ code: 1, message: '请求文章总数失败' });
                } else {
                    // console.log(row[0].total);
                    let total = row[0].total
                    res.json({ code: 200, message: { data: results, total } });
                }

            })
        }
    });
});
// 获取推荐文章
router.get('/api/getbeatlikeblog', (req, res) => {

    let orderby = req.query.orderby;

    let sqlStr = 'SELECT id,title,type,creatime,comments,likes FROM blogs WHERE blogs.state = 0'
        + ' UNION'
        + ' SELECT id,title,type,creatime,comments,likes  FROM question WHERE question.state = 0 '
        + ' UNION'
        + ' SELECT id,title,type,creatime,comments,likes  FROM life WHERE life.state = 0 '
        + ' order by ' + orderby + ' desc LIMIT 5';

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求数据失败' });
        } else {
            res.json({ code: 200, message: { data: results } });
        }
    });
});
// 获取最新评论
router.get('/api/getnewcomment', (req, res) => {


    let sqlStr = 'select * from comment where state = 0 order by createDate desc LIMIT 5';

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求数据失败' });
        } else {
            res.json({ code: 200, message: { data: results } });
        }
    });
});

/**
 * 获取文章信息
 */
router.get('/api/getblog', (req, res) => {
    // 获取参数
    let id = req.query.id;
    let name = req.query.name;


    let sqlStr = 'SELECT comments, creatime, ' + name + '.id, content,type, title, profile, user.nickname FROM ' + name + ',user WHERE ' + name + '.state = 0 and user.id = ' + name + '.uploaduser and ' + name + '.id = ' + id + ' ';


    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求文章信息失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});
//获取评论信息
router.get('/api/getcomment', (req, res) => {
    // 获取参数
    let id = req.query.id;
    let type = req.query.type;
    console.log({ id, type });


    let sqlStr = 'SELECT comment.id,comment.content,comment.createDate,user.id,user.nickname,user.avatar from comment,user where comment.userid = user.id and comment.blogid = ' + id + ' and comment.blogtype = ' + type + ' and user.state = 0 and comment.state = 0';

    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.json({ code: 0, message: '请求评论信息失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});
// =======================================================================================================================================
/**
 * 邮箱和密码登录
 */
router.post('/api/login', (req, res) => {

    const user_email = req.body.email;
    const user_pwd = md5(req.body.pwd + S_KEY);

    // 查询数据
    let sqlStr = "SELECT * FROM user WHERE email = '" + user_email + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ code: 0, message: '邮箱不正确!' });
        } else {
            results = JSON.parse(JSON.stringify(results));

            if (results[0]) {  // 用户已经存在
                // 验证密码是否正确
                if (results[0].password !== user_pwd) {
                    res.json({ err_code: 0, message: '密码不正确!' });
                } else {
                    req.session.userId = results[0].id;
                    let token = Token.encrypt({
                        data: {
                            id: results[0].id,
                            authority: results[0].authority,
                        }
                    }, '20h')
                    token = 'Bearer ' + token;
                    res.json({
                        code: 200,
                        message: {
                            id: results[0].id,
                            token: token,
                        },
                        info: '登录成功!'
                    });
                }
            }
        }
    });
});
// =================================管理员登录===============================
router.post('/api/adminlogin', (req, res) => {

    const user_email = req.body.email;
    const user_pwd = md5(req.body.pwd + S_KEY);

    // 查询数据
    let sqlStr = "SELECT * FROM user WHERE email = '" + user_email + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({ code: 0, message: '邮箱不正确!' });
        } else {
            results = JSON.parse(JSON.stringify(results));

            if (results[0]) {
                // 验证密码是否正确
                if (results[0].password !== user_pwd) {
                    res.json({ err_code: 0, message: '密码不正确!' });
                } else {
                    if (results[0].authority != 0) {
                        res.json({ err_code: 0, message: '无登录权限!' });
                    } else {
                        req.session.userId = results[0].id;
                        let token = Token.encrypt({
                            data: {
                                id: results[0].id,
                                authority: results[0].authority,
                            }
                        }, '20h')
                        token = 'Bearer ' + token;
                        res.json({
                            code: 200,
                            message: {
                                id: results[0].id,
                                token: token,
                            },
                            info: '登录成功!'
                        });
                    }
                }
            }
        }
    });
});

router.post('/api/register', (req, res) => {

    const user_email = req.body.email;
    const user_pwd = md5(req.body.pwd + S_KEY);
    const user_name = req.body.username;

    const addSql = "INSERT INTO user (email, nickname, password, avatar) VALUES (?, ?, ?, ?)";
    const addSqlParams = [user_email, user_name, user_pwd, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg'];
    conn.query(addSql, addSqlParams, (error, results, fields) => {
        results = JSON.parse(JSON.stringify(results));
        if (!error) {
            console.log(results);
            req.session.userId = results.insertId;
            let sqlStr = "SELECT * FROM user WHERE id = '" + results.insertId + "' LIMIT 1";
            conn.query(sqlStr, (error, results, fields) => {
                if (error) {
                    res.json({ code: 0, message: '注册失败' });
                } else {
                    results = JSON.parse(JSON.stringify(results));

                    res.json({
                        code: 200,
                        message: '注册成功'
                    });
                }
            });
        }
    });
});
// =====================================管理员注册===================================
router.post('/api/adminregister', (req, res) => {

    const user_email = req.body.email;
    const user_pwd = md5(req.body.pwd + S_KEY);
    const user_name = req.body.username;

    const addSql = "INSERT INTO user (email, nickname, password, avatar, authority) VALUES (?, ?, ?, ?)";
    const addSqlParams = [user_email, user_name, user_pwd, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg', 1];
    conn.query(addSql, addSqlParams, (error, results, fields) => {
        results = JSON.parse(JSON.stringify(results));
        if (!error) {
            console.log(results);
            req.session.userId = results.insertId;
            let sqlStr = "SELECT * FROM user WHERE id = '" + results.insertId + "' LIMIT 1";
            conn.query(sqlStr, (error, results, fields) => {
                if (error) {
                    res.json({ code: 0, message: '注册失败' });
                } else {
                    results = JSON.parse(JSON.stringify(results));

                    res.json({
                        code: 200,
                        message: {
                            id: results[0].id,
                            user_name: results[0].username || '',
                            user_email: results[0].email || '',
                            user_avatar: results[0].avator || ''
                        }
                    });
                }
            });
        }
    });
});
// =======================================================================================================================================
/**
 * 分类文章总数
 */
router.get('/api/articletotal', (req, res) => {
    // 获取参数
    let type = req.query.type || '';
    let sqlStr = 'SELECT count(*) as total FROM';
    if (type == 1) {
        sqlStr += ' question';
    } else if (type == 2) {
        sqlStr += ' blogs';
    } else if (type == 3) {
        sqlStr += ' life';
    }
    conn.query(sqlStr, (error, results, fields) => {
        if (!error) {
            results = JSON.parse(JSON.stringify(results));
            console.log(results[0]);
            res.json({ code: 200, message: results[0] });
        }
    });
});
/**
 * 全局文章总数
 */
router.get('/api/total', (req, res) => {
    // 获取参数
    let sqlStr = 'select sum(a) as total from (select count(*) a from question union all select count(*) a from blogs union all select count(*) a from life) as total';

    conn.query(sqlStr, (error, results, fields) => {
        if (!error) {
            results = JSON.parse(JSON.stringify(results));
            console.log(results[0]);
            res.json({ code: 200, message: results[0] });
        }
    });
});
// 全局评论数
router.get('/api/allcomment', (req, res) => {
    // 获取参数
    let sqlStr = 'select count(*) as total from comment';

    conn.query(sqlStr, (error, results, fields) => {
        if (!error) {
            results = JSON.parse(JSON.stringify(results));
            console.log(results[0]);
            res.json({ code: 200, message: results[0] });
        }
    });
});

// ===============================================================================================

/**
 * 获取用户信息
 */
router.get('/api/getuserinfo', (req, res) => {
    // 获取参数
    let id = req.query.id;

    let sqlStr = 'SELECT id, nickname, avatar, email from user where state = 0 and id = ' + id + '';
    conn.query(sqlStr, (error, results, fields) => {
        if (!error) {
            results = JSON.parse(JSON.stringify(results));
            res.json({ code: 200, message: results });
        }
    });
});
// 权限判别
router.get('/api/authority', (req, res) => {
    // 获取参数
    let data = req.auth.data;
    let id = req.query.id;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限！" });
    } else {
        let sqlStr = 'SELECT * from user where state = 0 and id = ' + id + '';
        conn.query(sqlStr, (error, results, fields) => {
            if (!error) {
                results = JSON.parse(JSON.stringify(results));
                if (results[0].authority == 0) {
                    res.json({ code: 200, message: results });
                } else {
                    res.json({ code: 401, message: "无权限！" });
                }
            }
        });
    }

});


// 获取全部用户信息
router.get('/api/getalluserinfo', (req, res) => {
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;
    // 获取参数
    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let tsqlstr = 'SELECT count(*) as total from user';
        conn.query(tsqlstr, (error, rest, fields) => {
            if (!error) {
                rest = JSON.parse(JSON.stringify(rest));
                let sqlStr = 'SELECT * from user LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
                conn.query(sqlStr, (error, results, fields) => {
                    if (!error) {
                        results = JSON.parse(JSON.stringify(results));
                        res.json({ code: 200, message:{data:results,count:rest[0].total}});
                    }
                });
            }
        });
    }
});
// 获取全部评论信息
router.get('/api/getallcomment', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;
    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let tsqlstr = 'SELECT count(*) as total from comment';
        conn.query(tsqlstr, (error, rest, fields) => {
            if (!error) {
                rest = JSON.parse(JSON.stringify(rest));
                let sqlStr = 'SELECT * from comment where state = 0 LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
                conn.query(sqlStr, (error, results, fields) => {
                    if (error) {
                        res.json({ code: 0, message: "获取评论数据失败" });
                    } else  {
                        results = JSON.parse(JSON.stringify(results));
                        res.json({ code: 200, message:{data:results,count:rest[0].total}});
                    }
                });
            }
        });
    }
});
// 获取全部blog
router.get('/api/getallblogs', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;
    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select blogs.content,blogs.id,blogs.title,type,blogs.creatime,profile,blogs.state,user.nickname,articletype.decription FROM blogs,user,articletype WHERE blogs.state = 0 and user.id = blogs.uploaduser and blogs.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
        conn.query(sqlStr, (error, results, fields) => {
            if (error) {
                res.json({ code: 0, message: "获取blog数据失败" });
            } {
                results = JSON.parse(JSON.stringify(results));
                res.json({ code: 200, message: results });
            }
        });
    }
});
// 获取全部question
router.get('/api/getallquestion', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;
    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select question.content,question.id,question.title,type,question.creatime,profile,question.state,user.nickname,articletype.decription FROM question,user,articletype WHERE question.state = 0 and user.id = question.uploaduser and question.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
        conn.query(sqlStr, (error, results, fields) => {
            if (error) {
                res.json({ code: 0, message: "获取数据失败" });
            } {
                results = JSON.parse(JSON.stringify(results));
                res.json({ code: 200, message: results });
            }
        });
    }
});
// 获取全部life
router.get('/api/getalllife', (req, res) => {
    // 获取参数
    let pageNo = req.query.pageNo;
    let pageSize = req.query.pageSize;
    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select life.content,life.id,life.title,type,life.creatime,profile,life.state,user.nickname,articletype.decription FROM life,user,articletype WHERE life.state = 0 and user.id = life.uploaduser and life.type = articletype.id LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
        conn.query(sqlStr, (error, results, fields) => {
            if (error) {
                res.json({ code: 0, message: "获取数据失败" });
            } {
                results = JSON.parse(JSON.stringify(results));
                res.json({ code: 200, message: results });
            }
        });
    }
});

// ==================== blog上传=================
router.post('/api/uploadblog', (req, res) => {

    const title = req.body.title;
    const profile = req.body.profile;
    let type = req.body.type;
    const content = req.body.content;

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select name from articletype where id = ' + type + ''
        conn.query(sqlStr, (error, results, fields) => {
            results = JSON.parse(JSON.stringify(results));
            if (!error) {
                console.log(results);
                let Str = "INSERT INTO " + results[0].name + " (title, profile, content) VALUES ('" + title + "', '" + profile + "', '" + content + "')";
                console.log(Str);
                conn.query(Str, (error, results, fields) => {
                    if (error) {
                        res.json({ code: 0, message: '上传失败' });
                    } else {
                        results = JSON.parse(JSON.stringify(results));

                        res.json({
                            code: 200,
                            message: '上传成功'
                        });
                    }
                });
            }
        });
    }
});
// =======blog更新=========
router.post('/api/updateblog', (req, res) => {

    const id = req.body.id;
    const title = req.body.title;
    const profile = req.body.profile;
    let type = req.body.type;
    const content = req.body.content;

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select name from articletype where id = ' + type + ''
        conn.query(sqlStr, (error, results, fields) => {
            results = JSON.parse(JSON.stringify(results));
            if (!error) {
                console.log(results);
                let Str = "UPDATE " + results[0].name + " SET title = '" + title + "' , profile = '" + profile + "', content = '" + content + "' WHERE id = " + id;
                console.log(Str);
                conn.query(Str, (error, results, fields) => {
                    if (error) {
                        res.json({ code: 0, message: '修改失败' });
                    } else {
                        results = JSON.parse(JSON.stringify(results));

                        res.json({
                            code: 200,
                            message: '修改成功'
                        });
                    }
                });
            }
        });
    }
});
//  删除博客
router.post('/api/deleteblog', (req, res) => {
    const id = req.body.id;
    let type = req.body.type;

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        let sqlStr = 'select name from articletype where id = ' + type + ''
        conn.query(sqlStr, (error, results, fields) => {
            results = JSON.parse(JSON.stringify(results));
            if (!error) {
                console.log(results);
                let Str = "UPDATE " + results[0].name + " SET state = 1 WHERE id = " + id;
                console.log(Str);
                conn.query(Str, (error, results, fields) => {
                    if (error) {
                        res.json({ code: 0, message: '删除失败' });
                    } else {
                        results = JSON.parse(JSON.stringify(results));

                        res.json({
                            code: 200,
                            message: '删除成功'
                        });
                    }
                });
            }
        })
    }
})
/**
 * 评论
*/
router.post('/api/postcomment', (req, res) => {
    // 获取参数
    let uid = req.body.uid;
    let bid = req.body.bid;
    let content = req.body.content;
    let blogtype = req.body.type;

    let Str = "INSERT INTO comment (userid, blogid, content, blogtype) VALUES ('" + uid + "', '" + bid + "', '" + content + "','" + blogtype + "')";
    console.log(Str);
    conn.query(Str, (error, results, fields) => {
        if (error) {
            res.json({ code: 0, message: '评论失败' });
        } else {
            results = JSON.parse(JSON.stringify(results));

            res.json({
                code: 200,
                message: '评论成功'
            });
        }
    });

});


/*********************************** 用户中心 **************************************** */

/**
 * 管理员修改用户信息 
 */
router.post('/api/changeuserinfo', (req, res) => {

    let id = req.body.id;
    let nickname = req.body.nickname;
    let sex = req.body.sex || '';
    let email = req.body.email || '';
    let phone = req.body.phone || '';
    let sign = req.body.sign || '';
    let authority = req.body.authority || '';

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        // 验证
        if (!id) {
            res.json({ code: 0, message: '修改用户信息失败!' });
        }
        // 更新数据
        let sqlStr = "UPDATE user SET nickname = ? , sex = ?, email = ?, phone = ?, sign = ?, authority = ? WHERE id = " + id;
        let strParams = [nickname, sex, email, phone, sign, authority];
        conn.query(sqlStr, strParams, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.json({ code: 0, message: '修改用户信息失败!' });
            } else {
                res.json({ code: 200, message: '修改用户信息成功!' });
            }
        })
    }
})
router.get('/api/banuserinfo', (req, res) => {

    let id = req.query.id;

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        // 验证
        if (!id) {
            res.json({ code: 0, message: '封禁用户失败!' });
        }
        // 更新数据
        let sqlStr = "UPDATE user SET state = 1  WHERE id = " + id;
        conn.query(sqlStr, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.json({ code: 0, message: '封禁用户信息失败!' });
            } else {
                res.json({ code: 200, message: '封禁用户信息成功!' });
            }
        })
    }
})
//管理员管理评论
router.get('/api/deletecomment', (req, res) => {

    let id = req.query.id;

    let data = req.auth.data;
    if (data.authority != 0) {
        res.json({ code: 401, message: "无权限!" });
    } else {
        // 验证
        if (!id) {
            res.json({ code: 0, message: '删除评论失败!' });
        }
        // 更新数据
        let sqlStr = "UPDATE comment SET state = 1  WHERE id = " + id;
        conn.query(sqlStr, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.json({ code: 0, message: '删除评论失败!' });
            } else {
                res.json({ code: 200, message: '删除评论成功!' });
            }
        })
    }
})

router.post('/api/changeuser', (req, res) => {
    // 获取客户端传过来的商品信息
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadsAvatarPath;  // 上传图片放置的文件夹
    form.keepExtensions = true; // 保持文件的原始扩展名
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        let id = fields.id;
        let user_nickname = fields.user_nickname || '';
        let user_sex = fields.user_sex || '';
        let user_address = fields.user_address || '';
        let user_birthday = fields.user_birthday || '';
        let user_sign = fields.user_sign || '';
        let user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg';
        if (files.user_avatar) {
            user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/' + basename(files.user_avatar.path);
        }

        // 验证
        if (!id) {
            res.json({ err_code: 0, message: '修改用户信息失败!' });
        }

        // 更新数据
        let sqlStr = "UPDATE user_info SET user_nickname = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ?, user_avatar = ? WHERE id = " + id;
        let strParams = [user_nickname, user_sex, user_address, user_birthday, user_sign, user_avatar];
        conn.query(sqlStr, strParams, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.json({ err_code: 0, message: '修改用户信息失败!' });
            } else {
                res.json({ success_code: 200, message: '修改用户信息成功!' });
            }
        });
    });
});

export default router;
