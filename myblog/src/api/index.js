import serviceaxios from '../utils/http.js';


export const getallarticle = (params)=>{
    return serviceaxios({
        url:"/api/getallarticle",
        method:"get",
        params,
    })
}
export const getbloglist = (params)=>{
    return serviceaxios({
        url:"/api/getbloglist",
        method:"get",
        params,
    })
}
export const getquestionlist = (params)=>{
    return serviceaxios({
        url:"/api/getqusetionlist",
        method:"get",
        params,
    })
}
export const getlifelist = (params)=>{
    return serviceaxios({
        url:"/api/getlifelist",
        method:"get",
        params,
    })
}

export const getblog = (params)=>{
    return serviceaxios({
        url:"/api/getblog",
        method:"get",
        params,
    })
}

export const gettablename = (params)=>{
    return serviceaxios({
        url:"/api/gettablename",
        method:"get",
        params,
    })
}

export const getflags = (params)=>{
    return serviceaxios({
        url:"/api/flags",
        method:"get",
        params,
    })
}
export const login = (data)=>{
    return serviceaxios({
        url:"/api/login",
        method:"post",
        data,
    })
}
export const adminlogin = (data)=>{
    return serviceaxios({
        url:"/api/adminlogin",
        method:"post",
        data,
    })
}
export const userlogin = (data)=>{
    return serviceaxios({
        url:"/api/login",
        method:"post",
        data,
    })
}
export const register = (data)=>{
    return serviceaxios({
        url:"/api/register",
        method:"post",
        data,
    })
}
export const adminregister = (data)=>{
    return serviceaxios({
        url:"/api/adminregister",
        method:"post",
        data,
    })
}
export const dosearch = (data)=>{
    return serviceaxios({
        url:"/api/search",
        method:"post",
        data,
    })
}
export const getarticletotal = (params)=>{
    return serviceaxios({
        url:"/api/articletotal",
        method:"get",
        params,
    })
}
export const gettotal = (params)=>{
    return serviceaxios({
        url:"/api/total",
        method:"get",
        params,
    })
}
export const getallcomment = (params)=>{
    return serviceaxios({
        url:'/api/allcomment',
        method:"get",
        params,
    })
}
export const getbestlikeblog = (params)=>{
    return serviceaxios({
        url:'/api/allcomment',
        method:"get",
        params,
    })
}
export const getbeatlikeblog = (params)=>{
    return serviceaxios({
        url:'/api/getbeatlikeblog',
        method:"get",
        params,
    })
}
export const getnewcomment = (params)=>{
    return serviceaxios({
        url:'/api/getnewcomment',
        method:"get",
        params,
    })
}
export const getcomment = (params)=>{
    return serviceaxios({
        url:'/api/getcomment',
        method:"get",
        params,
    })
}
export const getuserinfo = (params)=>{
    return serviceaxios({
        url:'/api/getuserinfo',
        method:"get",
        params,
    })
}
export const getalluserinfo = (params)=>{
    return serviceaxios({
        url:'/api/getalluserinfo',
        method:"get",
        params,
    })
}
export const getallcomments = (params)=>{
    return serviceaxios({
        url:'/api/getallcomment',
        method:"get",
        params,
    })
}
export const getallblogs = (params)=>{
    return serviceaxios({
        url:'/api/getallblogs',
        method:"get",
        params,
    })
}
export const getallquestion = (params)=>{
    return serviceaxios({
        url:'/api/getallquestion',
        method:"get",
        params,
    })
}
export const getalllife = (params)=>{
    return serviceaxios({
        url:'/api/getalllife',
        method:"get",
        params,
    })
}
export const uploadblog = (data)=>{
    return serviceaxios({
        url:'/api/uploadblog',
        method:"post",
        data,
    })
}
export const updateblog = (data)=>{
    return serviceaxios({
        url:'/api/updateblog',
        method:"post",
        data,
    })
}
export const deleteblog = (data)=>{
    return serviceaxios({
        url:'/api/deleteblog',
        method:"post",
        data,
    })
}
export const postcomment = (data)=>{
    return serviceaxios({
        url:'/api/postcomment',
        method:"post",
        data,
    })
}
export const authority = (params)=>{
    return serviceaxios({
        url:'/api/authority',
        method:"get",
        params,
    })
}

export const changeuserinfo = (data)=>{
    return serviceaxios({
        url:'/api/changeuserinfo',
        method:"post",
        data,
    })
}
export const banuserinfo = (params)=>{
    return serviceaxios({
        url:'/api/banuserinfo',
        method:"get",
        params,
    })
}
export const deletecomment = (params)=>{
    return serviceaxios({
        url:'/api/deletecomment',
        method:"get",
        params,
    })
}